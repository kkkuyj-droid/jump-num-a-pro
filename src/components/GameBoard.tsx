import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { LanguageSelector } from "./LanguageSelector";
import { ScoreDisplay } from "./ScoreDisplay";
import { JumpRopeAnimation } from "./JumpRopeAnimation";
import { AudioManager } from "./AudioManager";
import { useGameLogic } from "@/hooks/useGameLogic";
import { getTranslation } from "@/utils/translations";

export const GameBoard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  const { gameData, startGame, handleAnswer, resetGame, getRandomPositiveFeedback } = useGameLogic();
  const t = getTranslation(selectedLanguage);

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
      toast({
        title: t.timeUp,
        description: `${t.finalScore}: ${gameData.score}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [gameData.gameState, gameData.score, t.timeUp, t.finalScore]);

  const handleStartGame = () => {
    if (!elevenLabsApiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      return;
    }
    startGame();
  };

  const progressPercentage = ((5 - gameData.timeRemaining) / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.gameTitle}
            </h1>
            <div className="flex-1 flex justify-end">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{t.gameDescription}</p>
        </div>

        {/* Score Display */}
        <ScoreDisplay 
          currentScore={gameData.score}
          highScore={gameData.highScore}
          language={selectedLanguage}
        />

        {/* Main Game Area */}
        <div className="space-y-6">
          <JumpRopeAnimation isJumping={gameData.isJumping} />

          {/* Game Status Card */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-accent/30">
            {gameData.gameState === "menu" && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-foreground">{t.startGame}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.gameInstructions}
                </p>
                
                {showApiKeyInput && (
                  <div className="space-y-4">
                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-medium mb-2">
                        ElevenLabs API Key (Optional - for better voice quality)
                      </label>
                      <input
                        type="password"
                        value={elevenLabsApiKey}
                        onChange={(e) => setElevenLabsApiKey(e.target.value)}
                        placeholder="Enter your ElevenLabs API key"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty to use browser's built-in speech synthesis
                      </p>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={handleStartGame}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  {t.startGame}
                </Button>
              </div>
            )}

            {gameData.gameState === "playing" && (
              <div className="text-center">
                <p className="text-xl font-medium text-accent animate-pulse">
                  게임을 시작합니다...
                </p>
              </div>
            )}

            {gameData.gameState === "listening" && (
              <div className="text-center space-y-4">
                <p className="text-xl font-bold text-primary">{t.listening}</p>
                <p className="text-lg text-muted-foreground">"{gameData.currentText}"</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t.timeRemaining}: {gameData.timeRemaining}초</p>
                  <Progress value={progressPercentage} className="w-full max-w-md mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">키보드 숫자 키(1-10)를 눌러주세요</p>
              </div>
            )}

            {gameData.gameState === "waiting" && (
              <div className="text-center space-y-4">
                <p className="text-2xl font-bold text-success animate-bounce">
                  {t.wellDone}
                </p>
                <p className="text-lg text-muted-foreground">다음 문제를 준비하고 있습니다...</p>
              </div>
            )}

            {gameData.gameState === "gameOver" && (
              <div className="text-center space-y-6">
                <h2 className="text-2xl font-bold text-destructive">게임 종료!</h2>
                <div className="space-y-2">
                  <p className="text-xl">{t.finalScore}: <span className="font-bold text-primary">{gameData.score}</span></p>
                  <p className="text-lg text-muted-foreground">
                    {t.successCount}: {gameData.correctAnswers} {t.outOf} {gameData.totalQuestions}
                  </p>
                </div>
                <Button 
                  onClick={resetGame}
                  size="lg"
                  className="bg-gradient-to-r from-accent to-primary text-white font-bold px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  {t.playAgain}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Game Instructions */}
        <Card className="p-6 bg-white/60 backdrop-blur-sm border border-accent/20">
          <h3 className="text-lg font-bold mb-3 text-foreground">게임 설명</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>음성으로 한국어 숫자(1-10)를 들려드립니다</li>
            <li>5초 안에 키보드 숫자 키로 정답을 입력하세요</li>
            <li>정답을 맞히면 다음 문제로 넘어갑니다</li>
            <li>틀리거나 시간이 초과되면 게임이 종료됩니다</li>
            <li>최고 점수에 도전하세요!</li>
          </ul>
        </Card>

        {/* Audio Manager */}
        <AudioManager
          text={gameData.currentText}
          shouldPlay={gameData.gameState === "listening"}
          apiKey={elevenLabsApiKey}
          voice="male"
        />
      </div>
    </div>
  );
};