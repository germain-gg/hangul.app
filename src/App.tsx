import React, { useState, useReducer, useEffect } from "react";

import { randomiser, wordify } from "./utils";
import alphabet, { Letter, LetterType } from "./alphabet";

import { FlashCard } from "./FlashCard";

const LETTER_TYPE_STORAGE_KEY = "LETTER_TYPES";

function useRandomiser(items: any) {
  const [index, setCardIndex] = useState(0);

  useEffect(() => {
    setCardIndex(randomiser(0, items.length));
  }, [items.length]);

  return {
    item: items[index],
    shuffle: () => setCardIndex(randomiser(0, items.length))
  };
}

function useStorageSync(key: string, value: any) {
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value])
}

function reducer(state: any, action: any) {
	if (state.hasOwnProperty(action.type)) {
		return {
			...state,
			[action.type]: !state[action.type]
		}
	} else {
		return state;
	}
}

function init(initialState: object) {
  const data = localStorage.getItem(LETTER_TYPE_STORAGE_KEY);
  return data ? JSON.parse(data) : initialState;
}

export default function App() {

  const [enabledLetterTypes, dispatch] = useReducer(reducer, {
    [LetterType.VOWEL]:            true,
    [LetterType.CONSONANT]:        false,
		[LetterType.DOUBLE_VOWEL]:     false,
		[LetterType.DOUBLE_CONSONANT]: false
  }, init);

	useStorageSync(LETTER_TYPE_STORAGE_KEY, enabledLetterTypes);

	const letters: Array<Letter> = alphabet.filter(letter => {
		return enabledLetterTypes[letter.type];
	});

  const { item, shuffle } = useRandomiser(letters);

  return (
    <>
      <nav>
        <ul>
          {Object.keys(LetterType).map((type) => (
            <li key={type}>
              <label htmlFor={`checkbox-${type}`}>
                <input
                  onChange={() => dispatch({ type: type })}
                  type="checkbox"
                  name="letter_type"
                  checked={enabledLetterTypes[type]}
                  value={type}
                  id={`checkbox-${type}`}
                />
                {wordify(type)}
              </label>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => shuffle()}>
          <span role="img" aria-label="Refresh the question">
            🔄
          </span>
        </button>
      </nav>
      <div className="App">
        <FlashCard question={item?.char} answer={item?.romanization} />
      </div>
    </>
  );
}
