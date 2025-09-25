import { useEffect, useRef } from "react";
import { getRandomPositiveFeedback } from "@/utils/audioData";

interface FeedbackAudioProps {
  shouldPlayFeedback: boolean;
  onComplete?: () => void;
}

export const FeedbackAudio = ({ shouldPlayFeedback, onComplete }: FeedbackAudioProps) => {
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (shouldPlayFeedback && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      const feedback = getRandomPositiveFeedback();
      
      const speakNow = (voice: SpeechSynthesisVoice | null) => {
  const utterance = new SpeechSynthesisUtterance(feedback);
  utterance.lang = 'ko-KR';
  utterance.rate = 1.0;
  utterance.pitch = 1.2;

  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    hasPlayedRef.current = false;
    onComplete?.();
  };

  utterance.onerror = () => {
    hasPlayedRef.current = false;
    onComplete?.();
  };

  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 500);
};

let voices = speechSynthesis.getVoices();
let koreanVoice = voices.find(
  voice => voice.lang.includes('ko') || voice.name.includes('Korean')
);

if (koreanVoice) {
  speakNow(koreanVoice);
} else if (voices.length === 0) {
  speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    koreanVoice = voices.find(
      voice => voice.lang.includes('ko') || voice.name.includes('Korean')
    );
    speakNow(koreanVoice || null);
    speechSynthesis.onvoiceschanged = null; // 중복 방지
  };
} else {
  const fallback = voices.find(v => v.lang === 'ko-KR');
  speakNow(fallback || null);
}
    
    // Reset flag when shouldPlayFeedback becomes false
    if (!shouldPlayFeedback) {
      hasPlayedRef.current = false;
    }
  }, [shouldPlayFeedback, onComplete]);

  return null;
};
