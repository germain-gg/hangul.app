import { useState, useEffect, createContext } from "react";

import { assemble } from "hangul-js";
import { vowels, consonants } from "./alphabet";

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

const KOREAN_LOCALE = "ko-KR";

function getKoreanVoice() {
  if (window.speechSynthesis) {
    return (
      window.speechSynthesis.getVoices().find((voice) => {
        return voice.lang === KOREAN_LOCALE;
      }) || null
    );
  } else {
    return null;
  }
}

function isSpeechSynthesisAvailable() {
  return "speechSynthesis" in window;
}

export function useSpeechSynthesis() {
  const [isSpeaking, setSpeakingStatus] = useState(false);

  function speak(text: string) {
    if (!isSpeaking) {
      const utter = new SpeechSynthesisUtterance(text);

      const voice = getKoreanVoice();
      if (voice) {
        utter.voice = voice;
      }
      utter.lang = KOREAN_LOCALE;

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

export const AppContext = createContext({
  activePath: window.location.pathname,
});

export function useClientRouting() {
  const [activePath, setActivePath] = useState(window.location.pathname);

  function trackLinkClicks(event: any): void {
    const anchor =
      event.target.tagName.toLowerCase() === "a"
        ? event.target
        : event.target.closest("a");

    if (anchor instanceof HTMLAnchorElement) {
      const newPath = anchor.pathname;
      event.preventDefault();
      history.pushState({}, "", newPath);
      setActivePath(newPath);
    }
  }

  function updateActivePath() {
    setActivePath(window.location.pathname);
  }

  useEffect(() => {
    window.addEventListener("popstate", updateActivePath);
    window.addEventListener("click", trackLinkClicks, true);
    return () => {
      window.removeEventListener("popstate", updateActivePath);
      window.removeEventListener("click", trackLinkClicks, true);
    };
  }, []);

  return {
    activePath,
  };
}

export function generateSyllable() {
  const syllableCharacters = Array(randomiser(2, 4))
    .fill("")
    .map((_, index) => {
      const chars = index % 2 === 0 ? consonants : vowels;

      return chars[randomiser(0, chars.length)];
    });

  const hangulSymbol = assemble(
    syllableCharacters.map((letter) => letter.char)
  );
  const romanization = syllableCharacters
    .map((letter) => {
      return letter.romanization.split(",")[0].replace("-", "").trim();
    })
    .join("");

  return {
    char: hangulSymbol,
    romanization,
  };
}
