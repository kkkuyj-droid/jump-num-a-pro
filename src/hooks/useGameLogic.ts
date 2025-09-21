import { useState, useCallback, useEffect } from "react";
import { koreanNumbers, getRandomVariation, getRandomPositiveFeedback } from "@/utils/audioData";

export type GameState = "menu" | "playing" | "listening" | "waiting" | "gameOver";

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
    animationComplete: false
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Generate random number from 1-10
  const generateRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * 10) + 1;
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
      animationComplete: true // Skip animation, go straight to audio
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

      return {
        ...prev,
        score: newScore,
        highScore: newHighScore,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        gameState: isCorrect ? "waiting" : "gameOver",
        isJumping: false
      };
    });

    // If correct, continue to next round after delay
    if (isCorrect) {
      setTimeout(() => {
        startNewRound();
      }, 2000);
    }
  }, [gameData.gameState, gameData.currentNumber, timer, startNewRound]);

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
      isJumping: false
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
    getRandomPositiveFeedback,
    handleAnimationComplete
  };
};