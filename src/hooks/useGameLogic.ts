import { useState, useCallback, useEffect } from "react";
import { koreanNumbers, getRandomVariation, getRandomPositiveFeedback } from "@/utils/audioData";

export type GameState = "menu" | "playing" | "listening" | "waiting" | "gameOver" | "paused";

export interface GameData {
  currentNumber: number;
  currentText: string;
  score: number;
  highScore: number;
  timeRemaining: number;
  gameState: GameState;
  totalQuestions: number;
  correctAnswers: number;
  isJumping: boolean;
  animationComplete: boolean;
  currentQuestion: number;
  maxQuestions: number;
}

export const useGameLogic = () => {
  const [gameData, setGameData] = useState<GameData>({
    currentNumber: 0,
    currentText: "",
    score: 0,
    highScore: parseInt(localStorage.getItem("jumpRopeHighScore") || "0"),
    timeRemaining: 5,
    gameState: "menu",
    totalQuestions: 0,
    correctAnswers: 0,
    isJumping: false,
    animationComplete: false,
    currentQuestion: 0,
    maxQuestions: 999
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Generate random number from 1-10
  const generateRandomNumber = useCallback(() => {
    // Better randomization to ensure all numbers 1-10 appear more evenly
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return numbers[Math.floor(Math.random() * numbers.length)];
  }, []);

  // Start new round
  const startNewRound = useCallback(() => {
    const newNumber = generateRandomNumber();
    const newText = getRandomVariation(newNumber);
    
    setGameData(prev => ({
      ...prev,
      currentNumber: newNumber,
      currentText: newText,
      timeRemaining: 5,
      gameState: "listening",
      isJumping: true,
      animationComplete: true,
      currentQuestion: prev.currentQuestion + 1
    }));

    // Clear existing timer
    if (timer) clearTimeout(timer);

    // Start timer for 5 seconds immediately
    const newTimer = setTimeout(() => {
      setGameData(prev => ({
        ...prev,
        gameState: "gameOver",
        isJumping: false
      }));
    }, 5000);

    setTimer(newTimer);
  }, [generateRandomNumber, timer]);

  // Start game
  const startGame = useCallback(() => {
    setGameData(prev => ({
      ...prev,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      currentQuestion: 0,
      gameState: "playing"
    }));
    
    setTimeout(() => {
      startNewRound();
    }, 1000);
  }, [startNewRound]);

  // Handle user answer
  const handleAnswer = useCallback((userAnswer: number) => {
    if (gameData.gameState !== "listening") return;

    // Clear timer
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const isCorrect = userAnswer === gameData.currentNumber;
    
    setGameData(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newHighScore = Math.max(newScore, prev.highScore);
      
      // Save high score to localStorage
      if (newHighScore > prev.highScore) {
        localStorage.setItem("jumpRopeHighScore", newScore.toString());
      }

      // Game only ends on wrong answer, not on question count
      const shouldEndGame = !isCorrect;

      return {
        ...prev,
        score: newScore,
        highScore: newHighScore,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        gameState: shouldEndGame ? "gameOver" : "waiting",
        isJumping: false
      };
    });

    // If correct, continue to next round
    if (isCorrect) {
      setTimeout(() => {
        startNewRound();
      }, 2000);
    }
  }, [gameData.gameState, gameData.currentNumber, gameData.currentQuestion, gameData.maxQuestions, timer, startNewRound]);

  // Pause game
  const pauseGame = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setGameData(prev => ({
      ...prev,
      gameState: "paused"
    }));
  }, [timer]);

  // Resume game
  const resumeGame = useCallback(() => {
    setGameData(prev => ({
      ...prev,
      gameState: "listening"
    }));

    // Restart timer
    const newTimer = setTimeout(() => {
      setGameData(prev => ({
        ...prev,
        gameState: "gameOver",
        isJumping: false
      }));
    }, gameData.timeRemaining * 1000);

    setTimer(newTimer);
  }, [gameData.timeRemaining]);

  // Reset game
  const resetGame = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    
    setGameData(prev => ({
      ...prev,
      currentNumber: 0,
      currentText: "",
      score: 0,
      timeRemaining: 5,
      gameState: "menu",
      totalQuestions: 0,
      correctAnswers: 0,
      isJumping: false,
      currentQuestion: 0
    }));
  }, [timer]);

  // Timer countdown effect
  useEffect(() => {
    if (gameData.gameState === "listening" && gameData.timeRemaining > 0) {
      const countdown = setTimeout(() => {
        setGameData(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);

      return () => clearTimeout(countdown);
    }
  }, [gameData.gameState, gameData.timeRemaining]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  // Animation complete handler
  const handleAnimationComplete = useCallback(() => {
    setGameData(prev => ({
      ...prev,
      animationComplete: true
    }));

    // Start timer after animation completes
    const newTimer = setTimeout(() => {
      setGameData(prev => ({
        ...prev,
        gameState: "gameOver",
        isJumping: false
      }));
    }, 5000);

    setTimer(newTimer);
  }, []);

  return {
    gameData,
    startGame,
    handleAnswer,
    resetGame,
    pauseGame,
    resumeGame,
    getRandomPositiveFeedback,
    handleAnimationComplete
  };
};