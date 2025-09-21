import { useState, useEffect } from "react";

interface JumpRopeAnimationProps {
  isJumping: boolean;
  jumpCount?: number;
}

export const JumpRopeAnimation = ({ isJumping, jumpCount = 0 }: JumpRopeAnimationProps) => {
  const [currentJumps, setCurrentJumps] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'up' | 'down'>('down');

  useEffect(() => {
    if (isJumping && jumpCount > 0) {
      setCurrentJumps(0);
      const interval = setInterval(() => {
        setCurrentJumps(prev => {
          if (prev >= jumpCount) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
        
        // Toggle animation phase for jump rope effect
        setAnimationPhase(prev => prev === 'up' ? 'down' : 'up');
      }, 600);

      return () => clearInterval(interval);
    } else {
      setCurrentJumps(0);
      setAnimationPhase('down');
    }
  }, [isJumping, jumpCount]);

  const isActive = isJumping && currentJumps < jumpCount;

  return (
    <div className="relative flex justify-center items-center h-40">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-lg animate-pulse-glow" />
        
        {/* Jump rope character */}
        <div className={`relative transition-all duration-300 ${
          isActive && animationPhase === 'up' ? 'transform -translate-y-4' : ''
        }`}>
          {/* Character body */}
          <div className="w-16 h-24 bg-primary rounded-t-full relative">
            {/* Head */}
            <div className="w-10 h-10 bg-primary-foreground rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2" />
            
            {/* Arms holding jump rope handles */}
            <div className={`absolute top-1 -left-3 w-6 h-10 bg-accent rounded-full transition-transform duration-300 ${
              isActive ? 'transform rotate-45' : 'transform rotate-12'
            }`} />
            <div className={`absolute top-1 -right-3 w-6 h-10 bg-accent rounded-full transition-transform duration-300 ${
              isActive ? 'transform -rotate-45' : 'transform -rotate-12'
            }`} />
            
            {/* Legs */}
            <div className={`absolute -bottom-10 left-3 w-4 h-10 bg-primary rounded-full transition-transform duration-300 ${
              isActive && animationPhase === 'up' ? 'transform rotate-20' : ''
            }`} />
            <div className={`absolute -bottom-10 right-3 w-4 h-10 bg-primary rounded-full transition-transform duration-300 ${
              isActive && animationPhase === 'up' ? 'transform -rotate-20' : ''
            }`} />
          </div>
          
          {/* Jump rope - animated rope path */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32">
            {/* Rope path */}
            <svg className="w-full h-full" viewBox="0 0 128 128">
              <path
                d={isActive && animationPhase === 'up' 
                  ? "M 20 20 Q 64 10 108 20 Q 64 100 20 20" 
                  : "M 20 20 Q 64 80 108 20"
                }
                stroke="hsl(var(--accent))"
                strokeWidth="4"
                fill="none"
                className="transition-all duration-300"
              />
            </svg>
            
            {/* Rope handles */}
            <div className="absolute top-4 left-4 w-3 h-6 bg-accent rounded-full" />
            <div className="absolute top-4 right-4 w-3 h-6 bg-accent rounded-full" />
          </div>
        </div>
        
        {/* Jump counter display */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg animate-bounce">
            {currentJumps}
          </div>
          {jumpCount > 0 && (
            <div className="text-xs text-muted-foreground mt-1">/ {jumpCount}</div>
          )}
        </div>
      </div>
    </div>
  );
};