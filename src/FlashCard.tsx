import React, { useState, useEffect } from "react";
import { assemble } from "hangul-js";

import { isSpeechSynthesisAvailable, speak } from "./utils";

export function FlashCard({ question, answer }: FlashCardProps) {
  const [displayAnswer, setDisplayAnswer] = useState(false);
	useEffect(() => {
    setDisplayAnswer(false);
  }, [question, answer]);

  const [qq, setQQ] = useState(question)
  useEffect(() => {
		setQQ(assemble(question.split("")));
	}, [question]);

	return (
    <section className="card" onClick={() => {
			const willDisplayAnswer = !displayAnswer;
			setDisplayAnswer(willDisplayAnswer)
			if (willDisplayAnswer && isSpeechSynthesisAvailable()) {
				speak(qq);
			}
		}}>
      {displayAnswer ? answer : qq}
    </section>
  );
}

type FlashCardProps = {
	question: string
	answer: string
}

FlashCard.defaultProps = {
  question: "-",
  answer: "-"
};
