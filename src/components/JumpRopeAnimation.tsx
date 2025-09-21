import { useState, useEffect } from "react";

interface JumpRopeAnimationProps {
  isJumping: boolean;
  jumpCount?: number;
  onAnimationComplete?: () => void;
}

export const JumpRopeAnimation = ({ isJumping, jumpCount = 0, onAnimationComplete }: JumpRopeAnimationProps) => {
  const [currentJumps, setCurrentJumps] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ropePhase, setRopePhase] = useState<'over' | 'under'>('over');
  const [characterY, setCharacterY] = useState(0);

  useEffect(() => {
    if (isJumping && jumpCount > 0) {
      setCurrentJumps(0);
      setIsAnimating(true);
      setRopePhase('over');
      setCharacterY(0);
      
      const animateJumps = () => {
        let jumps = 0;
        const interval = setInterval(() => {
          jumps++;
          setCurrentJumps(jumps);
          
          // Animate rope swing and character jump - faster animation
          setRopePhase('under');
          setCharacterY(-25); // Jump higher
          
          setTimeout(() => {
            setRopePhase('over');
            setCharacterY(0); // Land down
          }, 150); // Faster transition
          
          if (jumps >= jumpCount) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnimating(false);
              setRopePhase('over');
              setCharacterY(0);
              onAnimationComplete?.();
            }, 300); // Shorter delay
          }
        }, 400); // Much faster jumping

        return interval;
      };

      const intervalId = animateJumps();
      return () => clearInterval(intervalId);
    } else {
      setCurrentJumps(0);
      setIsAnimating(false);
      setRopePhase('over');
      setCharacterY(0);
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

      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Main glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-2xl animate-magic-glow" />
        
        {/* Jump rope visualization */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Rope - animated path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144" style={{ overflow: 'visible' }}>
            {/* Rope path based on phase */}
            <path
              d={ropePhase === 'over' 
                ? "M 30 72 Q 72 20 114 72" // Rope over head
                : "M 30 72 Q 72 124 114 72" // Rope under feet
              }
              stroke={`hsl(var(--accent))`}
              strokeWidth="4"
              fill="none"
              className="transition-all duration-200 ease-in-out"
              style={{
                filter: isAnimating ? 'drop-shadow(0 0 8px hsl(var(--accent)))' : 'none'
              }}
            />
          </svg>
          
          {/* Rope handles */}
          <div 
            className="absolute w-4 h-8 rounded-full transition-all duration-200"
            style={{
              left: '20px',
              top: '64px',
              background: `hsl(var(--accent))`,
              transform: ropePhase === 'over' ? 'rotate(-30deg)' : 'rotate(30deg)'
            }}
          />
          <div 
            className="absolute w-4 h-8 rounded-full transition-all duration-200"
            style={{
              right: '20px',
              top: '64px',
              background: `hsl(var(--accent))`,
              transform: ropePhase === 'over' ? 'rotate(30deg)' : 'rotate(-30deg)'
            }}
          />
          
          {/* Jumping character/object */}
          <div 
            className="absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`,
              boxShadow: isAnimating ? '0 0 30px hsl(var(--primary))' : '0 0 15px hsl(var(--primary) / 0.5)',
              transform: `translateY(${characterY}px)`,
              left: '50%',
              top: '50%',
              marginLeft: '-32px',
              marginTop: '-32px'
            }}
          >
            {/* Inner core with face */}
            <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-background rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Jump counter - visible during animation to show current count */}
        {isAnimating && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
            <div className="relative">
              <div className="magic-gradient rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl text-background shadow-lg glow-primary animate-bounce">
                {currentJumps}
              </div>
              {jumpCount > 0 && (
                <div className="text-sm text-accent font-semibold mt-2 drop-shadow-lg">
                  / {jumpCount}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Ground line */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-primary/30 rounded-full"></div>
      </div>
    </div>
  );
};