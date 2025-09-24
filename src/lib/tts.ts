export const TTS = (() => {
  let ready = false;
  let voices: SpeechSynthesisVoice[] = [];

  function pickKoreanVoice(): SpeechSynthesisVoice | null {
    const all = window.speechSynthesis.getVoices() || [];
    const byLang = all.filter((v) => v.lang?.toLowerCase().startsWith("ko"));
    return (
      byLang.find((v) => /yuna/i.test(v.name)) ||
      byLang.find((v) => /(google|wavenet|standard)/i.test(v.name)) ||
      byLang[0] ||
      all[0] ||
      null
    );
  }

  async function init() {
    if (ready) return;
    voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      await new Promise((resolve) => {
        const handler = () => {
          voices = window.speechSynthesis.getVoices();
          resolve(null);
        };
        window.speechSynthesis.addEventListener("voiceschanged", handler);
        setTimeout(resolve, 1000);
      });
    }

    try {
      const u = new SpeechSynthesisUtterance("준비되었습니다");
      u.voice = pickKoreanVoice();
      u.volume = 0;
      u.lang = "ko-KR";
      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("TTS warmup failed", e);
    }

    ready = true;
  }

  function speak(text: string) {
    if (!ready) return;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = pickKoreanVoice();
    u.lang = "ko-KR";
    window.speechSynthesis.speak(u);
  }

  return { init, speak };
})();
