import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { GuessData } from "../../game-helpers";
import Guesses from "../Guesses";
import GuessForm from "../GuessForm";
import Keyboard from "../Keyboard";

function Game() {
  const [answer, setAnswer] = React.useState(() => {
    const newAnswer = sample(WORDS);
    console.info("Answer: ", newAnswer);
    return newAnswer;
  });
  const [guesses, setGuesses] = React.useState(() => {
    return getEmptyGameBoard(answer);
  });
  const [numberOfGuesses, setNumberOfGuesses] = React.useState(0);
  const [winStatus, setWinStatus] = React.useState("playing");
  const [alphabet, setAlphabet] = React.useState({});

  function getEmptyGameBoard(newAnswer) {
    return range(0, NUM_OF_GUESSES_ALLOWED).map(() => {
      return new GuessData("", newAnswer);
    });
  }

  function resetGame() {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setNumberOfGuesses(0);
    setGuesses(getEmptyGameBoard(newAnswer));
    setAlphabet({});
    setWinStatus("playing");
  }

  function addGuess(guess) {
    const newGuesses = [...guesses];
    let newGuess = new GuessData(guess, answer);
    newGuesses[numberOfGuesses] = newGuess;
    setGuesses(newGuesses);
    let newNumberOfGuesses = numberOfGuesses + 1;
    setNumberOfGuesses(newNumberOfGuesses);
    let newWinStatus = "playing";
    updateLetterStatuses(newGuess);
    if (newGuess.isCorrect) {
      newWinStatus = "won";
    } else if (newNumberOfGuesses >= NUM_OF_GUESSES_ALLOWED) {
      newWinStatus = "lost";
    }
    setWinStatus(newWinStatus);
  }

  function updateLetterStatuses(newGuessData) {
    const newAlphabet = { ...alphabet };
    newGuessData.letters().forEach((letter, index) => {
      const status = newGuessData.statusAtIndex(index);
      // Skip if letter already is correct.
      if (newAlphabet[letter] === "correct") {
        return;
      }
      // Also skip if it is incorrect but has already been marked as misplaced.
      // (Happens if the guess has repeated letters but the answer has no repeats.)
      if (status === "incorrect") {
        if (newAlphabet[letter] === "misplaced") {
          return;
        }
      }
      newAlphabet[letter] = status;
    });
    setAlphabet(newAlphabet);
  }

  return (
    <>
      <Guesses guesses={guesses} answer={answer}></Guesses>
      <GuessForm
        addGuess={addGuess}
        numberOfGuesses={numberOfGuesses}
        winStatus={winStatus}
        resetGame={resetGame}
      ></GuessForm>
      <Keyboard alphabet={alphabet}></Keyboard>
    </>
  );
}

export default Game;
