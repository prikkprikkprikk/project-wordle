import React from "react";

function GuessForm({ addGuess, numberOfGuesses, winStatus, resetGame }) {
  const [guess, setGuess] = React.useState("");

  function handleChange(event) {
    if (event.target.value.length > 5) {
      console.log("Max length of guess is 5.");
      event.target.value = guess;
      return;
    }
    setGuess(event.target.value.toUpperCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    addGuess(guess);
    setGuess("");
  }

  function input() {
    const disabled = winStatus !== "playing";
    return (
      <input
        disabled={disabled}
        id="guess-input"
        type="text"
        title="Enter a 5 letter word."
        pattern="[a-zA-Z]{5}"
        value={guess}
        onChange={handleChange}
      />
    );
  }

  function resetGameButton() {
    return (
      <button className="reset-game" onClick={() => resetGame()}>
        Reset game
      </button>
    );
  }

  function happyBanner() {
    if (winStatus !== "won") return null;
    const congratulation = numberOfGuesses === 6 ? "Phew!" : "Congratulations!";
    return (
      <div className="happy banner">
        <p>
          <strong>{congratulation}</strong> You got it in{" "}
          <strong>{numberOfGuesses} guesses</strong>.
        </p>
        {resetGameButton()}
      </div>
    );
  }

  function sadBanner() {
    if (winStatus !== "lost") return null;
    return (
      <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>LEARN</strong>.
        </p>
        {resetGameButton()}
      </div>
    );
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      {input()}
      {happyBanner()}
      {sadBanner()}
    </form>
  );
}

export default GuessForm;
