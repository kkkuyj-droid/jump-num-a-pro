import jumpRopeImage from "@/assets/jump-rope-hero.jpg";

interface JumpRopeAnimationProps {
  isJumping: boolean;
}

export const JumpRopeAnimation = ({ isJumping }: JumpRopeAnimationProps) => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="relative">
        {/* Glow effect behind the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-xl transform scale-110 animate-pulse-glow" />
        
        {/* Main image container */}
        <div className={`relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-4 border-accent/40 shadow-2xl transition-all duration-300 ${
          isJumping ? 'animate-jump-rope' : 'animate-bounce-gentle'
        }`}>
          <img 
            src={jumpRopeImage}
            alt="Jump rope animation"
            className="w-80 h-48 object-cover rounded-xl shadow-lg"
          />
          
          {/* Animated rope elements */}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary rounded-full animate-bounce opacity-70" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-warning/60 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};