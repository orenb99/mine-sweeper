import Board from "./components/Board";
import Timer from "./components/Timer";
import "./styles/App.css";
function App() {
  return (
    <div className="App">
      <h1>Mine Sweeper</h1>
      <Board rows={20} cols={30} />
      <Timer />
    </div>
  );
}

export default App;
