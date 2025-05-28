function Guess({ guess, answer: string }) {
  const classNames = (letterIndex) =>
    "cell" + (guess.length() ? " " + guess.statusAtIndex(letterIndex) : "");
  return guess.letters().map((letter, letterIndex) => {
    return (
      <span className={classNames(letterIndex)} key={letterIndex}>
        {letter}
      </span>
    );
  });
}

export default Guess;
