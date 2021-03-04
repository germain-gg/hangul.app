import React, { useState, useReducer, useEffect } from "react";

import { useRandomiser, wordify, initReducer, useStorageSync, LETTER_TYPE_STORAGE_KEY } from "./utils/utils";
import alphabet, { Letter, LetterType } from "./utils/alphabet";

import { FlashCard } from "./components/FlashCard";
import Modal from "./components/Modal";
import ActionButton from "./components/ActionButton";

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

export default function App() {

  const [enabledLetterTypes, dispatch] = useReducer(reducer, {
    [LetterType.VOWEL]:            true,
    [LetterType.CONSONANT]:        false,
		[LetterType.DOUBLE_VOWEL]:     false,
		[LetterType.DOUBLE_CONSONANT]: false
  }, initReducer);

	useStorageSync(LETTER_TYPE_STORAGE_KEY, enabledLetterTypes);

	const letters: Array<Letter> = alphabet.filter(letter => {
		return enabledLetterTypes[letter.type];
	});

  const { item, shuffle } = useRandomiser(letters);

	const [displayAnswer, setAnswerVisibility] = useState(false);
	useEffect(() => {
		setAnswerVisibility(false);
	}, [item]);

	const [displaySettings, setSettingsVisibility] = useState(false);

  return (
		<>
			<header>
				<h1 lang="ko">
					<span role="img" aria-label="Korean flags">
						🇰🇷
					</span>
					한글 배우기
				</h1>
			</header>
			<main>
				<FlashCard
					question={item?.char}
					answer={item?.romanization}
					displayAnswer={displayAnswer}
				/>
			</main>
			<aside>

				<ActionButton
					color="#5639E0"
					label="Choose level"
					icon="⚙️"
					active={displaySettings}
					onClick={() => setSettingsVisibility(!displaySettings)}
				/>
				<ActionButton
					color="#FF6C27"
					label="Toggle the answer"
					icon="👀"
					active={displayAnswer}
					onClick={() => setAnswerVisibility(!displayAnswer)}
				/>
				<ActionButton
					color="#00CA8B"
					label="Next question"
					icon="🔄"
					onClick={() => shuffle()}
				/>

				{displaySettings && (
					<Modal onClose={() => setSettingsVisibility(false)}>
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
					</Modal>
				)}
			</aside>
		</>
  );
}
