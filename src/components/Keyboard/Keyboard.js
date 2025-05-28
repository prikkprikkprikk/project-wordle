import React from "react";

function Keyboard({ alphabet }) {
  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  function letterStatus(letter) {
    if (alphabet[letter] === undefined) {
      return "";
    }
    return " " + alphabet[letter];
  }

  function Row({ letters }) {
    const rowElements = letters.map((letter) => {
      return (
        <span key={letter} className={"letter" + letterStatus(letter)}>
          {letter}
        </span>
      );
    });
    return rowElements;
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row top-row">
        <Row key="row0" letters={keyboardLayout[0]}></Row>
      </div>
      <div className="keyboard-row middle-row">
        <Row key="row1" letters={keyboardLayout[1]}></Row>
      </div>
      <div className="keyboard-row bottom-row">
        <Row key="row2" letters={keyboardLayout[2]}></Row>
      </div>
    </div>
  );
}

export default Keyboard;
