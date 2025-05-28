import React from "react";

import Guess from "../Guess";

function Guesses({ guesses, answer }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => {
        return (
          <p className="guess" key={index}>
            <Guess guess={guess} answer={answer}></Guess>
          </p>
        );
      })}
    </div>
  );
}

export default Guesses;
