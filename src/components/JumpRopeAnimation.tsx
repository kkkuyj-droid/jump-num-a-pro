interface JumpRopeAnimationProps {
  isJumping: boolean;
  jumpCount?: number;
}

export const JumpRopeAnimation = ({ isJumping, jumpCount = 0 }: JumpRopeAnimationProps) => {
  return (
    <div className="relative flex justify-center items-center h-32">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-lg animate-pulse-glow" />
        
        {/* Jump rope character */}
        <div className={`relative transition-all duration-300 ${
          isJumping ? 'animate-bounce' : ''
        }`}>
          {/* Character body */}
          <div className="w-16 h-20 bg-primary rounded-t-full relative">
            {/* Head */}
            <div className="w-8 h-8 bg-primary-foreground rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2" />
            
            {/* Arms */}
            <div className="absolute top-2 -left-2 w-4 h-8 bg-accent rounded-full transform rotate-12" />
            <div className="absolute top-2 -right-2 w-4 h-8 bg-accent rounded-full transform -rotate-12" />
            
            {/* Legs */}
            <div className={`absolute -bottom-8 left-2 w-3 h-8 bg-primary rounded-full transition-transform duration-200 ${
              isJumping ? 'transform rotate-12' : ''
            }`} />
            <div className={`absolute -bottom-8 right-2 w-3 h-8 bg-primary rounded-full transition-transform duration-200 ${
              isJumping ? 'transform -rotate-12' : ''
            }`} />
          </div>
          
          {/* Jump rope */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-accent rounded-full transition-transform duration-300 ${
            isJumping ? 'animate-spin' : ''
          }`} />
        </div>
        
        {/* Jump counter display */}
        {jumpCount > 0 && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm animate-bounce">
            {jumpCount}
          </div>
        )}
      </div>
    </div>
  );
};