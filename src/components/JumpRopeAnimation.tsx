import { useState, useEffect } from "react";

interface JumpRopeAnimationProps {
  isJumping: boolean;
  jumpCount?: number;
  onAnimationComplete?: () => void;
}

export const JumpRopeAnimation = ({ isJumping, jumpCount = 0, onAnimationComplete }: JumpRopeAnimationProps) => {
  const [currentJumps, setCurrentJumps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isJumping && jumpCount > 0) {
      setCurrentJumps(0);
      setIsAnimating(true);
      
      const animateJumps = () => {
        let jumps = 0;
        const interval = setInterval(() => {
          jumps++;
          setCurrentJumps(jumps);
          
          if (jumps >= jumpCount) {
            clearInterval(interval);
            setIsAnimating(false);
            setTimeout(() => {
              onAnimationComplete?.();
            }, 500); // Small delay before audio
          }
        }, 600);

        return interval;
      };

      const intervalId = animateJumps();
      return () => clearInterval(intervalId);
    } else {
      setCurrentJumps(0);
      setIsAnimating(false);
    }
  }, [isJumping, jumpCount, onAnimationComplete]);

  return (
    <div className="relative flex justify-center items-center h-48 mb-4">
      {/* Magical floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Main glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-2xl animate-magic-glow" />
        
        {/* Jump rope visualization */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Rope path - animated circle */}
          <div 
            className={`absolute w-28 h-28 border-4 rounded-full transition-all duration-300 ${
              isAnimating && currentJumps < jumpCount
                ? 'border-accent animate-rope-spin shadow-[0_0_20px_hsl(var(--accent))]' 
                : 'border-primary/50'
            }`}
          />
          
          {/* Center jumping element */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAnimating && currentJumps < jumpCount
              ? 'bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_hsl(var(--primary))] transform -translate-y-2' 
              : 'bg-gradient-to-br from-primary/70 to-accent/70'
          }`}>
            {/* Inner core */}
            <div className="w-6 h-6 bg-foreground rounded-full" />
          </div>
          
          {/* Rope handles */}
          <div className={`absolute -left-2 top-1/2 w-4 h-8 rounded-full transition-all duration-300 ${
            isAnimating ? 'bg-accent rotate-12' : 'bg-primary/70'
          }`} />
          <div className={`absolute -right-2 top-1/2 w-4 h-8 rounded-full transition-all duration-300 ${
            isAnimating ? 'bg-accent -rotate-12' : 'bg-primary/70'
          }`} />
        </div>
        
        {/* Jump counter with magical effect */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="relative">
            <div className="magic-gradient rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl text-background shadow-lg glow-primary">
              {currentJumps}
            </div>
            {jumpCount > 0 && (
              <div className="text-sm text-accent font-semibold mt-2 drop-shadow-lg">
                / {jumpCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};