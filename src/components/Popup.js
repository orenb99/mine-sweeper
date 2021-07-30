import React, { useState, useEffect } from "react";

function Popup({
  started,
  setDifficulty,
  setSize,
  finishTime,
  startGame,
  size,
  difficulty,
  win,
}) {
  const [chosenDiff, setChosenDiff] = useState();
  const [chosenSize, setChosenSize] = useState();
  useEffect(() => {
    if (size) {
      if (size[0] === 8) setChosenSize("small");
      else if (size[0] === 10) setChosenSize("medium");
      else if (size[0] === 20) setChosenSize("big");
      else if (size[0] === 30) setChosenSize("very-big");
    }
    if (difficulty) {
      if (difficulty === 8) setChosenDiff("easy");
      else if (difficulty === 6) setChosenDiff("medium");
      else if (difficulty === 5) setChosenDiff("hard");
      else if (difficulty === 4) setChosenDiff("extreme");
    }
  }, [size, difficulty]);
  return (
    <div className="pop-up">
      <div className="pop-up-inner">
        {started && (
          <div>
            <h1>
              {"You "} {win ? "Win!" : "Lose!"}
            </h1>
            <h2>{"Your Time: " + finishTime}</h2>{" "}
          </div>
        )}
        <u>Choose Difficulty</u>
        <span className="difficulties">
          <b
            onClick={() => setDifficulty(8)}
            className={chosenDiff === "easy" ? "chosen diff" : ""}
          >
            Easy
          </b>
          <b
            onClick={() => setDifficulty(6)}
            className={chosenDiff === "medium" ? "chosen diff" : ""}
          >
            Medium
          </b>
          <b
            onClick={() => setDifficulty(5)}
            className={chosenDiff === "hard" ? "chosen diff" : ""}
          >
            Hard
          </b>
          <b
            onClick={() => setDifficulty(4)}
            className={chosenDiff === "extreme" ? "chosen diff" : ""}
          >
            Extreme
          </b>
        </span>
        <u>Choose Board Size</u>
        <span className="sizes">
          <b
            className={chosenSize === "small" ? "chosen size" : ""}
            onClick={() => {
              setSize([8, 10]);
            }}
          >
            Small
          </b>
          <b
            className={chosenSize === "medium" ? "chosen size" : ""}
            onClick={() => {
              setSize([10, 15]);
            }}
          >
            Medium
          </b>
          <b
            className={chosenSize === "big" ? "chosen size" : ""}
            onClick={() => {
              setSize([20, 25]);
            }}
          >
            Big
          </b>
          <b
            className={chosenSize === "very-big" ? "chosen size" : ""}
            onClick={() => {
              setSize([30, 40]);
            }}
          >
            Very Big
          </b>
        </span>
        <div className="start-button" onClick={startGame}>
          {started ? "Restart" : "Start"}
        </div>
      </div>
    </div>
  );
}

export default Popup;
