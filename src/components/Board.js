import React, { useState, useEffect } from "react";
import Tile from "./Tile";
function Board({ rows, cols }) {
  const [tileArray, setTileArray] = useState([]);
  const [bombAmount, setBombAmount] = useState(0);
  const [flagAmount, setFlagAmount] = useState(0);

  useEffect(() => {
    let arr = [];
    let bombs = Math.floor((rows * cols) / 15);
    let bombCount = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let item = { row: i, col: j, bomb: false, visible: false };
        arr.push(item);
      }
    }

    while (bombCount < bombs) {
      let rnd = Math.floor(Math.random() * arr.length);
      if (!arr[rnd].bomb) {
        arr[rnd].bomb = true;
        bombCount++;
      }
    }
    arr = arr.map((item) => {
      item.content = checkAdjacent(item, arr);
      return item;
    });
    setBombAmount(bombs);
    setTileArray(arr);
  }, []);

  function checkAdjacent(tile, arr) {
    if (tile.bomb) return "bomb";
    const temp = getAdjacent(tile, arr);
    const count = temp
      .map((item) => (item.bomb ? 1 : 0))
      .reduce((prev, curr) => prev + curr);
    return count;
  }
  function getAdjacent(tile, arr) {
    const row = tile.row;
    const col = tile.col;
    const temp = arr.filter(
      (item) =>
        (item.row === row - 1 || item.row === row || item.row === row + 1) &&
        (item.col === col - 1 || item.col === col || item.col === col + 1)
    );
    return temp;
  }

  function digAdjacent(tile, arr) {
    let clean = [tile];
    while (clean.length !== 0) {
      let p = clean.pop();
      console.log(p);
      if (!p.visible) p.visible = true;
      if (p.content !== 0) continue;
      let adj = getAdjacent(p, arr).filter((item) => !item.visible);
      clean = clean.concat(adj);
    }
  }

  function digAll() {
    const temp = [...tileArray].map((item) => {
      item.visible = true;
      return item;
    });
    setTileArray(temp);
  }
  function addFlag(val) {
    setFlagAmount(flagAmount + val);
  }

  function dig(row, col) {
    const temp = [...tileArray];
    const index = temp.indexOf(
      temp.find((item) => item.col === col && item.row === row)
    );
    temp[index].visible = !temp[index].visible;
    if (temp[index].content === "bomb") {
      console.log("done");
      digAll();
      return;
    }
    if (temp[index].content === 0) digAdjacent(temp[index], temp);
    setTileArray(temp);
  }
  return (
    <div>
      <h1>Board</h1>
      <h2>
        Flags: {flagAmount}, Bombs: {bombAmount}
      </h2>
      <table>
        <tbody>
          {new Array(rows).fill(0).map((val, i) => (
            <tr className="row">
              {new Array(cols).fill(0).map((val, j) => (
                <td>
                  {tileArray.find(
                    (item) => item.row === i && item.col === j
                  ) && (
                    <Tile
                      tile={tileArray.find(
                        (item) => item.row === i && item.col === j
                      )}
                      addFlag={addFlag}
                      dig={dig}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
