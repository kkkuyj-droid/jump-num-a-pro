import { Card } from "@/components/ui/card";
import { getTranslation } from "@/utils/translations";

interface ScoreDisplayProps {
  currentScore: number;
  highScore: number;
  language: string;
}

export const ScoreDisplay = ({ currentScore, highScore, language }: ScoreDisplayProps) => {
  const t = getTranslation(language);

  return (
    <div className="flex gap-6 justify-center items-center">
      <Card className="px-6 py-4 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground mb-1">{t.score}</div>
          <div className="text-3xl font-bold text-primary animate-pulse-glow">{currentScore}</div>
        </div>
      </Card>
      
      <Card className="px-6 py-4 bg-gradient-to-r from-accent/10 to-warning/10 border-2 border-accent/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground mb-1">{t.highScore}</div>
          <div className="text-3xl font-bold text-accent">{highScore}</div>
        </div>
      </Card>
    </div>
  );
};