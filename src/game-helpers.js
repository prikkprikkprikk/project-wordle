export class GuessData {
  answer = []; // The correct answer to check against
  checkedAnswerLetters = [false, false, false, false, false];
  guessedLetters = []; // The letters guessed by the player
  statuses = []; // Whether each guessed letter is correct, misplaced or incorrect
  isCorrect = false;

  constructor(guess, answer) {
    if (guess.length === 0) {
      this.guessedLetters = ["", "", "", "", ""];
    } else {
      this.guessedLetters = guess.split("");
    }
    this.answer = answer.split("");
    this.check();
  }

  length() {
    return this.guessedLetters.length;
  }

  letters() {
    return this.guessedLetters;
  }

  check() {
    // We first check if letters are empty or correct
    this.guessedLetters.forEach((letter, index) => {
      // First, if the letter is empty, no guess has been made yet.
      if (letter === "") {
        this.statuses[index] = "unguessed";
        return;
      }
      // If letter is correct in the correct place, we mark the answer letter as such
      // to avoid checking against it again later.
      if (letter === this.answer[index]) {
        this.statuses[index] = "correct";
        this.checkedAnswerLetters[index] = true;
        return;
      }
    });

    // If no guess has been made yet, we don't need to continue checking.
    if (this.guess === "") {
      return;
    }

    // Go through each guessed letter that is not correct.
    this.guessedLetters.forEach((guessedLetter, guessedLetterIndex) => {
      // Skip letters that already have been labelled as correct.
      if (this.statuses[guessedLetterIndex] === "correct") {
        return;
      }
      // Check against each answer letter.
      this.answer.forEach((answerLetter, answerLetterIndex) => {
        // Skip checking if we've already found it to be misplaced.
        if (this.statuses[guessedLetterIndex] === "misplaced") {
          return;
        }
        // Skip already "taken" answer letters.
        if (this.checkedAnswerLetters[answerLetterIndex]) {
          return;
        }
        if (guessedLetter === answerLetter) {
          this.statuses[guessedLetterIndex] = "misplaced";
          // Mark this answer letter as "taken"
          this.checkedAnswerLetters[answerLetterIndex] = true;
        }
      });

      if (
        this.statuses[guessedLetterIndex] !== "unguessed" &&
        this.statuses[guessedLetterIndex] !== "correct" &&
        this.statuses[guessedLetterIndex] !== "misplaced"
      ) {
        this.statuses[guessedLetterIndex] = "incorrect";
      }
    });

    this.isCorrect = this.statuses.reduce((accumulator, status) => {
      return accumulator && status === "correct";
    }, true);
  }

  statusAtIndex(index) {
    return this.statuses[index];
  }
}
