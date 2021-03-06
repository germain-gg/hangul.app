import React, { useState, useEffect, CSSProperties } from "react";
import { assemble } from "hangul-js";

import { useSpeechSynthesis } from "../utils/utils";

export function FlashCard({ question, answer, displayAnswer, color }: FlashCardProps): JSX.Element {
  const [assembledQuestion, setAssembledQuestion] = useState(question);

  useEffect(() => {
    setAssembledQuestion(assemble(question.split("")));
  }, [question]);

  const {
    isSpeechSynthesisAvailable,
    isSpeaking,
    speak,
  } = useSpeechSynthesis();

  return (
    <div className="wrapper">
      <section className="card" style={{ "--background": color } as CSSProperties}>
        <p className="card-inner" lang={displayAnswer ? "en" : "ko"}>
          {displayAnswer ? answer : assembledQuestion}

          {displayAnswer && isSpeechSynthesisAvailable && (
            <button
              disabled={isSpeaking}
              type="button"
              onClick={() => speak(assembledQuestion)}
              className="speech-button"
              role="img"
              aria-label="Play character sound"
            >
              📣
            </button>
          )}
        </p>
      </section>
    </div>
  );
}

type FlashCardProps = {
  question: string;
  answer: string;
  displayAnswer?: boolean;
  color?: string
};

FlashCard.defaultProps = {
  question: "-",
  answer: "-",
  displayAnswer: false,
  color: "#333"
};
