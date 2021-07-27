import Board from "./components/Board";
import Timer from "./components/Timer";
function App() {
  return (
    <div className="App">
      <h1>Mine Sweeper</h1>
      <Board rows={10} cols={10} />
      <Timer />
    </div>
  );
}

export default App;
