import Board from "./components/Board";
import Timer from "./components/Timer";
import "./styles/App.css";
function App() {
  return (
    <div className="App">
      <h1>Mine Sweeper</h1>
      <Board rows={10} cols={20} />
      <Timer />
    </div>
  );
}

export default App;
