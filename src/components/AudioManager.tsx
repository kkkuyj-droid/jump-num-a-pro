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
  speechSynthesis.cancel();  // 🔁 이전 발화 제거

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.85;
  utterance.pitch = 0.8;
  utterance.volume = 1.0;

  // 🔍 한국어 음성 찾기 (남성 우선, 없으면 fallback)
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

  // ✅ 안정적인 실행을 위해 약간의 지연 후 발화
  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 300);

  return;
} catch (error) {
  console.error("Audio playback failed:", error);
  isPlayingRef.current = false;
  onPlayComplete?.();
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
