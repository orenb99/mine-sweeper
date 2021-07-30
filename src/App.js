import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Timer from "./components/Timer";
import "./styles/App.css";
function App() {
  const [over, setOver] = useState(false);
  return (
    <div className="App">
      <h1>Mine Sweeper</h1>
      <Timer />
      {over ? (
        <button onClick={() => setOver(false)}>Restart</button>
      ) : (
        <Board rows={20} cols={30} setOver={setOver} />
      )}
    </div>
  );
}

export default App;
