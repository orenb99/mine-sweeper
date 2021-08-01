import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Popup from "./components/Popup";
import Timer from "./components/Timer";
import "./styles/App.css";
function App() {
  const [over, setOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [size, setSize] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [finishTime, setFinishTime] = useState();
  const [win, setWin] = useState();
  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage();
      }, 3000);
    }
  }, [alertMessage]);

  const startGame = () => {
    if (!difficulty) {
      setAlertMessage("No Difficulty Chosen");
      return;
    }
    if (!size) {
      setAlertMessage("No Size Chosen");
      return;
    }
    if (started) {
      setOver(false);
    } else setStarted(true);
  };

  return (
    <div className="App">
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      {started && (
        <>
          <Timer over={over} started={started} setFinishTime={setFinishTime} />
          <Board
            over={over}
            rows={size[0]}
            cols={size[1]}
            difficulty={difficulty}
            setOver={setOver}
            setAlertMessage={setAlertMessage}
            setWin={setWin}
          />
        </>
      )}
      {(over || !started) && (
        <Popup
          size={size}
          difficulty={difficulty}
          setOver={setOver}
          started={started}
          startGame={startGame}
          finishTime={finishTime}
          setDifficulty={setDifficulty}
          setSize={setSize}
          win={win}
        />
      )}
    </div>
  );
}

export default App;
