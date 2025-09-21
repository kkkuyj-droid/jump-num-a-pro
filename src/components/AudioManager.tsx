import { useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface AudioManagerProps {
  text: string;
  shouldPlay: boolean;
  onPlayComplete?: () => void;
  voice?: "male" | "female";
  apiKey?: string;
}

export const AudioManager = ({ 
  text, 
  shouldPlay, 
  onPlayComplete, 
  voice = "male"
}: AudioManagerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const playAudio = async () => {
    if (!text || isPlayingRef.current) return;

    isPlayingRef.current = true;

    try {
      // Use browser speech synthesis with enhanced male voice settings
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 0.8; // Lower pitch for young male voice
      utterance.volume = 1.0; // Maximum volume
      
      // Try to find a Korean male voice
      const voices = speechSynthesis.getVoices();
      const koreanVoice = voices.find(voice => 
        (voice.lang.includes('ko') || voice.name.includes('Korean')) &&
        (voice.name.toLowerCase().includes('male') || !voice.name.toLowerCase().includes('female'))
      ) || voices.find(voice => 
        voice.lang.includes('ko') || voice.name.includes('Korean')
      );
      
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      utterance.onend = () => {
        isPlayingRef.current = false;
        onPlayComplete?.();
      };

      utterance.onerror = () => {
        isPlayingRef.current = false;
        onPlayComplete?.();
      };

      speechSynthesis.speak(utterance);
      return;
    } catch (error) {
      console.error("Audio playback failed:", error);
      
      // Fallback to speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        isPlayingRef.current = false;
        onPlayComplete?.();
      };

      speechSynthesis.speak(utterance);
      return;
    }
  };

  useEffect(() => {
    if (shouldPlay && text) {
      playAudio();
    }
  }, [shouldPlay, text]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        isPlayingRef.current = false;
        onPlayComplete?.();
      };

      const handleError = () => {
        isPlayingRef.current = false;
        onPlayComplete?.();
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [onPlayComplete]);

  return <audio ref={audioRef} style={{ display: 'none' }} />;
};