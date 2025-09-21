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
  voice = "male",
  apiKey 
}: AudioManagerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const playAudio = async () => {
    if (!text || isPlayingRef.current) return;

    isPlayingRef.current = true;

    try {
      // If API key is provided, use ElevenLabs
      if (apiKey) {
        const voiceId = voice === "male" ? "TX3LPaxmHKxFdv7VOQHJ" : "pFZP5JQG7iQjIQuC4Bku"; // Liam or Lily
        
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.5,
              use_speaker_boost: true
            }
          })
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            await audioRef.current.play();
          }
        } else {
          throw new Error("API call failed");
        }
      } else {
        // Fallback to browser speech synthesis
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        
        // Try to find a Korean voice
        const voices = speechSynthesis.getVoices();
        const koreanVoice = voices.find(voice => 
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
        return; // Don't set up audio element event for speech synthesis
      }
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