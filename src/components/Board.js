import React, { useState, useEffect } from "react";
import Tile from "./Tile";
function Board({ rows, cols }) {
  const [tileArray, setTileArray] = useState([]);
  const [bombAmount, setBombAmount] = useState(0);
  const [flagAmount, setFlagAmount] = useState(0);

  useEffect(() => {
    let arr = [];
    let bombs = Math.floor((rows * cols) / 3);
    let bombCount = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let item = { row: i, col: j, bomb: false };
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
    const row = tile.row;
    const col = tile.col;
    const temp = arr.filter(
      (item) =>
        (item.row === row - 1 || item.row === row || item.row === row + 1) &&
        (item.col === col - 1 || item.col === col || item.col === col + 1)
    );
    const count = temp
      .map((item) => (item.bomb ? 1 : 0))
      .reduce((prev, curr) => prev + curr);
    return count;
  }

  return (
    <div>
      <h1>Board</h1>
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
