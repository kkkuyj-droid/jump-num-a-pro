import { useEffect } from "react";
import { getRandomPositiveFeedback } from "@/utils/audioData";

interface FeedbackAudioProps {
  shouldPlayFeedback: boolean;
  onComplete?: () => void;
}

export const FeedbackAudio = ({ shouldPlayFeedback, onComplete }: FeedbackAudioProps) => {
  useEffect(() => {
    if (shouldPlayFeedback) {
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
        onComplete?.();
      };

      utterance.onerror = () => {
        onComplete?.();
      };

      // Small delay to let correct sound effect play first
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 500);
    }
  }, [shouldPlayFeedback, onComplete]);

  return null;
};