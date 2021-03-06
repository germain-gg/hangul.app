import React, { useState, useEffect } from "react";

import {
  generateSyllable
} from "../utils/utils";

import { FlashCard } from "../components/FlashCard";
import ActionButton from "../components/ActionButton";

function SyllablesPage(): JSX.Element {

  const [item, setItem] = useState(generateSyllable())

  const [displayAnswer, setAnswerVisibility] = useState(false);
  useEffect(() => {
    setAnswerVisibility(false);
  }, [item]);

  return (
    <>
      <main>
        <FlashCard
          question={item?.char}
          answer={item?.romanization}
          displayAnswer={displayAnswer}
          color="#FF6C27"
        />
      </main>
      <aside>
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
          onClick={() => setItem(generateSyllable())}
        />
      </aside>
    </>
  );
}

export default SyllablesPage;
