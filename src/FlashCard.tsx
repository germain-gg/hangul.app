import React, { useState, useEffect } from "react";
import { assemble } from "hangul-js";

import { useSpeechSynthesis } from "./utils";

export function FlashCard({ question, answer, displayAnswer }: FlashCardProps) {

  const [qq, setQQ] = useState(question)

 	useEffect(() => {
		setQQ(assemble(question.split("")));
	}, [question]);

	const {
		isSpeechSynthesisAvailable,
		isSpeaking,
		speak
	} = useSpeechSynthesis();

	return (
		<div className="wrapper">
			<section className="card">
				<p className="card-inner" lang={displayAnswer ? "en" : "ko"}>
					{displayAnswer ? answer : qq}

					{ displayAnswer && isSpeechSynthesisAvailable && (
						<button disabled={isSpeaking} type="button" onClick={() => speak(qq)} className="speech-button">
							<span role="img" aria-label="Play character sound">
								📣
							</span>
						</button>
					)}

				</p>
			</section>
		</div>
  );
}

type FlashCardProps = {
	question: string
	answer: string
	displayAnswer?: boolean
}

FlashCard.defaultProps = {
  question: "-",
  answer: "-",
  displayAnswer: false
};
