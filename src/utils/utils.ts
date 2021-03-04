import { useState, useEffect } from "react";

export function randomiser(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function useRandomiser(items: any) {
  const [index, setCardIndex] = useState(0);

  useEffect(() => {
    setCardIndex(randomiser(0, items.length));
  }, [items.length]);

  return {
    item: items[index],
    shuffle: () => setCardIndex(randomiser(0, items.length)),
  };
}

export function wordify(word: string): string {
  return (
    word.charAt(0) + word.slice(1).toLowerCase().replaceAll("_", " ") + "s"
  );
}

function getKoreanVoice() {
  const koreanLocale = "ko-KR";
  if (window.speechSynthesis) {
    return (
      window.speechSynthesis.getVoices().find((voice) => {
        return voice.lang === koreanLocale;
      }) || null
    );
  } else {
    return null;
  }
}

function isSpeechSynthesisAvailable() {
  return window.speechSynthesis && getKoreanVoice();
}

export function useSpeechSynthesis() {
  const [isSpeaking, setSpeakingStatus] = useState(false);

  function speak(text: string) {
    if (!isSpeaking) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.voice = getKoreanVoice();
      utter.rate = 0.75;

      setSpeakingStatus(true);

      utter.addEventListener("end", () => setSpeakingStatus(false));
      utter.addEventListener("error", () => setSpeakingStatus(false));

      speechSynthesis.speak(utter);
    }
  }

  return {
    isSpeechSynthesisAvailable: isSpeechSynthesisAvailable(),
    isSpeaking,
    speak,
  };
}

export const LETTER_TYPE_STORAGE_KEY = "LETTER_TYPES";

export function useStorageSync(key: string, value: unknown): void {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
}

export function initReducer(initialState: any): unknown {
  const data = localStorage.getItem(LETTER_TYPE_STORAGE_KEY);
  return data ? JSON.parse(data) : initialState;
}
