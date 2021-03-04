import React, { useState, useEffect } from "react";
import { assemble } from "hangul-js";

import { isSpeechSynthesisAvailable, speak } from "./utils";

export function FlashCard({ question, answer, displayAnswer }: FlashCardProps) {

  const [qq, setQQ] = useState(question)
  useEffect(() => {
		setQQ(assemble(question.split("")));
	}, [question]);

	return (
		<div className="wrapper">
			<section className="card" onClick={() => {
					if (isSpeechSynthesisAvailable()) {
						speak(qq);
					}
				}}>
				<p className="card-inner" lang={displayAnswer ? "en" : "ko"}>
					{displayAnswer ? answer : qq}
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
