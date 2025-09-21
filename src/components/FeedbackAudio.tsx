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
      
      const utterance = new SpeechSynthesisUtterance(feedback);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      
      // Try to find a Korean voice
      const voices = speechSynthesis.getVoices();
      const koreanVoice = voices.find(voice => 
        voice.lang.includes('ko') || voice.name.includes('Korean')
      );
      
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      utterance.onend = () => {
        hasPlayedRef.current = false;
        onComplete?.();
      };

      utterance.onerror = () => {
        hasPlayedRef.current = false;
        onComplete?.();
      };

      // Small delay to let correct sound effect play first
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 500);
    }
    
    // Reset flag when shouldPlayFeedback becomes false
    if (!shouldPlayFeedback) {
      hasPlayedRef.current = false;
    }
  }, [shouldPlayFeedback, onComplete]);

  return null;
};