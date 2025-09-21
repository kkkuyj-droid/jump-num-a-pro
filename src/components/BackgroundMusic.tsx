import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  volume?: number;
}

export const BackgroundMusic = ({ isPlaying, volume = 0.1 }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const createBackgroundMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/background-music.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    
    audioRef.current.play().catch(console.log);
  };

  const stopBackgroundMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (isPlaying && !isInitialized) {
      setIsInitialized(true);
    }
  }, [isPlaying, isInitialized]);

  useEffect(() => {
    if (isPlaying && isInitialized) {
      createBackgroundMusic();
    } else if (!isPlaying && audioRef.current) {
      stopBackgroundMusic();
    }

    return () => {
      if (audioRef.current) {
        stopBackgroundMusic();
      }
    };
  }, [isPlaying, isInitialized]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return null;
};