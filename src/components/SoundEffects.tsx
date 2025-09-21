import { useEffect, useRef } from "react";

interface SoundEffectsProps {
  playCorrectSound: boolean;
  playIncorrectSound: boolean;
  onSoundComplete?: () => void;
}

export const SoundEffects = ({ playCorrectSound, playIncorrectSound, onSoundComplete }: SoundEffectsProps) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const createBeep = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    
    oscillator.onended = () => {
      onSoundComplete?.();
    };
  };

  const playCorrectBeep = () => {
    // Pleasant ascending chord
    createBeep(523, 0.15); // C5
    setTimeout(() => createBeep(659, 0.15), 100); // E5
    setTimeout(() => createBeep(784, 0.2), 200); // G5
  };

  const playIncorrectBeep = () => {
    // Harsh descending sound
    createBeep(200, 0.3, 'sawtooth');
  };

  useEffect(() => {
    if (playCorrectSound) {
      playCorrectBeep();
    }
  }, [playCorrectSound]);

  useEffect(() => {
    if (playIncorrectSound) {
      playIncorrectBeep();
    }
  }, [playIncorrectSound]);

  return null;
};