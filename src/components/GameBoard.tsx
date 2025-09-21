import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { LanguageSelector } from "./LanguageSelector";
import { ScoreDisplay } from "./ScoreDisplay";
import { JumpRopeAnimation } from "./JumpRopeAnimation";
import { AudioManager } from "./AudioManager";
import { SoundEffects } from "./SoundEffects";
import { FeedbackAudio } from "./FeedbackAudio";
import { BackgroundMusic } from "./BackgroundMusic";
import { useGameLogic } from "@/hooks/useGameLogic";
import { getTranslation } from "@/utils/translations";

export const GameBoard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playIncorrectSound, setPlayIncorrectSound] = useState(false);
  const [playFeedback, setPlayFeedback] = useState(false);
  
  const { gameData, startGame, handleAnswer, resetGame, getRandomPositiveFeedback, handleAnimationComplete } = useGameLogic();
  const t = getTranslation(selectedLanguage);

  console.log('Current language:', selectedLanguage);
  console.log('Translation object:', t);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameData.gameState !== "listening") return;

    const key = event.key;
    const number = parseInt(key);
    
    if (number >= 1 && number <= 10) {
      handleAnswer(number);
    }
  }, [gameData.gameState, handleAnswer]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // Handle correct answer feedback
  useEffect(() => {
    if (gameData.gameState === "waiting") {
      const feedback = getRandomPositiveFeedback();
      setPlayCorrectSound(true);
      setPlayFeedback(true);
      toast({
        title: t.correct,
        description: feedback,
        duration: 1500,
      });
    }
  }, [gameData.gameState, t.correct, getRandomPositiveFeedback]);

  // Handle game over
  useEffect(() => {
    if (gameData.gameState === "gameOver") {
      setPlayIncorrectSound(true);
      toast({
        title: t.timeUp,
        description: `${t.finalScore}: ${gameData.score}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [gameData.gameState, gameData.score, t.timeUp, t.finalScore]);

  const handleStartGame = () => {
    startGame();
  };

  const progressPercentage = ((5 - gameData.timeRemaining) / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card p-2">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 glow-primary">
          <div className="flex-1" />
          <h1 className="text-xl lg:text-2xl font-bold magic-gradient bg-clip-text text-transparent drop-shadow-lg text-center">
            {t.gameTitle}
          </h1>
          <div className="flex-1 flex justify-end">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          {/* Left: Score Display */}
          <div className="lg:col-span-1">
            <div className="bg-card/70 backdrop-blur-sm border border-accent/30 rounded-xl p-4 glow-accent">
              <ScoreDisplay 
                currentScore={gameData.score}
                highScore={gameData.highScore}
                language={selectedLanguage}
              />
            </div>
          </div>

          {/* Center: Game Area */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-4">
            <JumpRopeAnimation 
              isJumping={gameData.isJumping} 
              jumpCount={gameData.gameState === "listening" ? gameData.currentNumber : 0}
              onAnimationComplete={handleAnimationComplete}
            />

            {/* Game Status Card */}
            <Card className="p-4 bg-card/70 backdrop-blur-sm border border-primary/30 h-fit glow-primary">
              {gameData.gameState === "menu" && (
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-bold text-foreground">{t.startGame}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t.gameInstructions}
                  </p>
                  <Button 
                    onClick={handleStartGame}
                    size="lg"
                    className="magic-gradient text-background font-bold px-6 py-3 hover:scale-105 transition-transform shadow-lg glow-primary"
                  >
                    {t.startGame}
                  </Button>
                </div>
              )}

              {gameData.gameState === "playing" && (
                <div className="text-center">
                  <p className="text-lg font-medium text-accent animate-pulse">
                    게임을 시작합니다...
                  </p>
                </div>
              )}

              {gameData.gameState === "listening" && (
                <div className="text-center space-y-3">
                  <p className="text-lg font-bold text-primary">{t.listening}</p>
                  {gameData.animationComplete && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{t.timeRemaining}: {gameData.timeRemaining}초</p>
                      <Progress value={progressPercentage} className="w-full" />
                    </div>
                  )}
                </div>
              )}

              {gameData.gameState === "waiting" && (
                <div className="text-center space-y-3">
                  <p className="text-xl font-bold text-success animate-bounce">
                    {t.wellDone}
                  </p>
                  <p className="text-sm text-muted-foreground">다음 문제를 준비하고 있습니다...</p>
                </div>
              )}

              {gameData.gameState === "gameOver" && (
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-bold text-destructive">게임 종료!</h2>
                  <div className="space-y-2">
                    <p className="text-lg">{t.finalScore}: <span className="font-bold text-primary">{gameData.score}</span></p>
                    <p className="text-sm text-muted-foreground">
                      {t.successCount}: {gameData.correctAnswers} {t.outOf} {gameData.totalQuestions}
                    </p>
                  </div>
                  <Button 
                    onClick={resetGame}
                    size="lg"
                    className="magic-gradient text-background font-bold px-6 py-3 hover:scale-105 transition-transform shadow-lg glow-accent"
                  >
                    {t.playAgain}
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Number Buttons & Instructions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Number Buttons */}
            <Card className="p-4 bg-card/70 backdrop-blur-sm border border-accent/30 glow-accent">
              <h3 className="text-lg font-bold mb-3 text-center text-foreground">숫자 버튼</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                  <Button
                    key={number}
                    onClick={() => handleAnswer(number)}
                    disabled={gameData.gameState !== "listening"}
                    className={`h-14 text-xl font-bold transition-all duration-200 transform ${
                      gameData.gameState === "listening" 
                        ? 'magic-gradient text-background shadow-lg hover:shadow-xl hover:scale-110 border-2 border-primary/30 glow-primary' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    } ${number === gameData.currentNumber && gameData.gameState === "waiting" ? 'ring-4 ring-success animate-pulse' : ''}`}
                  >
                    <span className="drop-shadow-sm">{number}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Game Instructions */}
            <Card className="p-4 bg-card/50 backdrop-blur-sm border border-accent/20">
              <h3 className="text-base font-bold mb-2 text-foreground">게임 설명</h3>
              <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside">
                <li>줄넘기 애니메이션을 확인하세요</li>
                <li>음성을 듣고 정답을 선택하세요</li>
                <li>키보드 또는 버튼을 사용하세요</li>
                <li>최고 점수에 도전하세요!</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Background Music */}
        <BackgroundMusic
          isPlaying={gameData.gameState !== "menu"}
          volume={0.2}
        />
        
        {/* Audio Manager */}
        <AudioManager
          text={gameData.currentText}
          shouldPlay={gameData.gameState === "listening" && gameData.animationComplete}
          voice="male"
        />
        
        {/* Sound Effects */}
        <SoundEffects
          playCorrectSound={playCorrectSound}
          playIncorrectSound={playIncorrectSound}
          onSoundComplete={() => {
            setPlayCorrectSound(false);
            setPlayIncorrectSound(false);
          }}
        />
        
        {/* Feedback Audio */}
        <FeedbackAudio
          shouldPlayFeedback={playFeedback}
          onComplete={() => setPlayFeedback(false)}
        />
      </div>
    </div>
  );
};