export enum LetterType {
  VOWEL = "VOWEL",
  CONSONANT = "CONSONANT",
  DOUBLE_VOWEL = "DOUBLE_VOWEL",
  DOUBLE_CONSONANT = "DOUBLE_CONSONANT",
}

export interface Letter {
  type: LetterType;
  char: string;
  romanization: string;
  keyMapping?: string;
  keyModifier?: string;
}

const alphabet: Array<Letter> = [
  /**
   * Vowels
   */

  { char: "ㅏ", romanization: "a", keyMapping: "k", type: LetterType.VOWEL },
  { char: "ㅑ", romanization: "ya", keyMapping: "i", type: LetterType.VOWEL },
  { char: "ㅓ", romanization: "eo", keyMapping: "j", type: LetterType.VOWEL },
  { char: "ㅕ", romanization: "yeo", keyMapping: "u", type: LetterType.VOWEL },
  { char: "ㅗ", romanization: "o", keyMapping: "h", type: LetterType.VOWEL },
  { char: "ㅛ", romanization: "yo", keyMapping: "y", type: LetterType.VOWEL },
  { char: "ㅜ", romanization: "u", keyMapping: "n", type: LetterType.VOWEL },
  { char: "ㅠ", romanization: "yu", keyMapping: "b", type: LetterType.VOWEL },
  { char: "ㅡ", romanization: "eu", keyMapping: "m", type: LetterType.VOWEL },
  { char: "ㅣ", romanization: "i", keyMapping: "l", type: LetterType.VOWEL },

  /**
   * Consonants
   */

  {
    char: "ㄱ",
    romanization: "g, k",
    keyMapping: "r",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㄴ",
    romanization: "n",
    keyMapping: "s",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㄷ",
    romanization: "t",
    keyMapping: "e",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㄹ",
    romanization: "r, l",
    keyMapping: "f",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅁ",
    romanization: "m",
    keyMapping: "a",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅂ",
    romanization: "b, p",
    keyMapping: "q",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅅ",
    romanization: "s",
    keyMapping: "t",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅇ",
    romanization: "-",
    keyMapping: "d",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅈ",
    romanization: "j",
    keyMapping: "w",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅊ",
    romanization: "ch",
    keyMapping: "c",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅋ",
    romanization: "g, k",
    keyMapping: "z",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅌ",
    romanization: "dd",
    keyMapping: "x",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅍ",
    romanization: "pp",
    keyMapping: "v",
    type: LetterType.CONSONANT,
  },
  {
    char: "ㅎ",
    romanization: "h",
    keyMapping: "g",
    type: LetterType.CONSONANT,
  },

  /**
   * Double vowel
   */

  {
    char: "ㅐ",
    romanization: "ae",
    keyMapping: "o",
    type: LetterType.DOUBLE_VOWEL,
  },
  {
    char: "ㅒ",
    romanization: "yae",
    keyMapping: "o",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_VOWEL,
  },
  {
    char: "ㅔ",
    romanization: "e",
    keyMapping: "p",
    type: LetterType.DOUBLE_VOWEL,
  },
  {
    char: "ㅖ",
    romanization: "ye",
    keyMapping: "p",
    type: LetterType.DOUBLE_VOWEL,
  },
  { char: "ㅗㅏ", romanization: "wa", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅗㅐ", romanization: "wae", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅗㅣ", romanization: "oe", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅜㅓ", romanization: "wo", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅜㅔ", romanization: "we", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅜㅣ", romanization: "wi", type: LetterType.DOUBLE_VOWEL },
  { char: "ㅡㅣ", romanization: "ui", type: LetterType.DOUBLE_VOWEL },

  /**
   *
   */

  {
    char: "ㄲ",
    romanization: "kk",
    keyMapping: "r",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_CONSONANT,
  },
  {
    char: "ㄸ",
    romanization: "tt",
    keyMapping: "e",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_CONSONANT,
  },
  {
    char: "ㅃ",
    romanization: "pp",
    keyMapping: "q",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_CONSONANT,
  },
  {
    char: "ㅆ",
    romanization: "ss",
    keyMapping: "t",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_CONSONANT,
  },
  {
    char: "ㅉ",
    romanization: "jj",
    keyMapping: "w",
    keyModifier: "Shift",
    type: LetterType.DOUBLE_CONSONANT,
  },
];

export default alphabet;
