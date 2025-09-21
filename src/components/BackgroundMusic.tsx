import { useEffect, useRef, useState } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  volume?: number;
}

export const BackgroundMusic = ({ isPlaying, volume = 0.1 }: BackgroundMusicProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const createBackgroundMusic = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    
    // Create oscillator for background music
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a gentle, less intrusive sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Lower frequency A3
    
    // Create a simple, slow melody pattern
    const notes = [220, 246.94, 261.63, 293.66]; // A-B-C-D (lower octave)
    let noteIndex = 0;
    
    const playMelody = () => {
      if (oscillator && gainNode) {
        oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
        noteIndex = (noteIndex + 1) % notes.length;
      }
    };
    
    // Play melody notes every 2 seconds (much slower)
    const melodyInterval = setInterval(playMelody, 2000);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    
    // Store interval reference to clear later
    (oscillator as any).melodyInterval = melodyInterval;
  };

  const stopBackgroundMusic = () => {
    if (oscillatorRef.current && gainNodeRef.current) {
      const oscillator = oscillatorRef.current;
      const gainNode = gainNodeRef.current;
      
      // Clear melody interval
      if ((oscillator as any).melodyInterval) {
        clearInterval((oscillator as any).melodyInterval);
      }
      
      gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 0.5);
      
      setTimeout(() => {
        try {
          oscillator.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      }, 500);
    }
  };

  useEffect(() => {
    const initAudio = async () => {
      try {
        // Request user interaction to enable audio
        if (!isInitialized && isPlaying) {
          await audioContextRef.current?.resume();
          setIsInitialized(true);
        }
      } catch (e) {
        console.log('Audio context initialization failed');
      }
    };

    initAudio();
  }, [isPlaying, isInitialized]);

  useEffect(() => {
    if (isPlaying && isInitialized && !oscillatorRef.current) {
      createBackgroundMusic();
    } else if (!isPlaying && oscillatorRef.current) {
      stopBackgroundMusic();
    }

    return () => {
      if (oscillatorRef.current) {
        stopBackgroundMusic();
      }
    };
  }, [isPlaying, isInitialized, volume]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  return null;
};