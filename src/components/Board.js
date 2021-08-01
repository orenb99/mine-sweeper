import React, { useState, useEffect } from "react";
import Tile from "./Tile";
function Board({
  over,
  rows,
  cols,
  setOver,
  setAlertMessage,
  difficulty,
  setWin,
}) {
  const [tileArray, setTileArray] = useState([]);
  const [bombAmount, setBombAmount] = useState(0);
  const [flagAmount, setFlagAmount] = useState(0);

  useEffect(() => {
    if (over) return;
    let arr = [];
    let bombs = Math.floor((rows * cols) / difficulty);
    let bombCount = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let item = { row: i, col: j, bomb: false, visible: false, flag: false };
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
  }, [over]);

  useEffect(() => {
    let temp = [...tileArray].filter((item) => item.flag);
    setFlagAmount(temp.length);
  }, [tileArray]);

  useEffect(() => {
    if (bombAmount === 0) return;
    let flaggedBombs = [...tileArray].filter((item) => item.bomb && item.flag);
    let rest = [...tileArray].filter((item) => !item.bomb && item.visible);
    if (
      flaggedBombs.length === bombAmount &&
      rest.length + flaggedBombs.length === tileArray.length
    ) {
      endGame(true);
    }
  }, [flagAmount, tileArray]);

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
      if (!p.visible) {
        p.visible = true;
        p.flag = false;
      }
      if (p.content !== 0) continue;
      let adj = getAdjacent(p, arr).filter((item) => !item.visible);
      clean = clean.concat(adj);
    }
  }

  function quickDig(tile) {
    let arr = [...tileArray];
    let adj = getAdjacent(tile, arr);
    let flags = adj.filter((item) => item.flag).length;
    if (flags >= tile.content) {
      if (adj.find((item) => item.bomb && !item.flag)) {
        endGame(false);
        return;
      }
      adj.forEach((item) => {
        if (!item.bomb) {
          if (item.content === 0) {
            digAdjacent(item, arr);
          }
          item.flag = false;
          item.visible = true;
        }
        return item;
      });
      setTileArray(arr);
    }
  }

  function endGame(win) {
    const temp = [...tileArray].map((item) => {
      item.visible = true;
      return item;
    });
    if (!win) setTileArray(temp);
    setWin(win);
    setOver(true);
  }
  function addFlag(tile) {
    let temp = [...tileArray];
    let index = temp.indexOf(
      temp.find((item) => tile.col === item.col && item.row === tile.row)
    );
    temp[index].flag = !temp[index].flag;
    setTileArray(temp);
  }

  function dig(row, col) {
    const temp = [...tileArray];
    const index = temp.indexOf(
      temp.find((item) => item.col === col && item.row === row)
    );
    temp[index].visible = !temp[index].visible;
    temp[index].flag = false;
    if (temp[index].content === "bomb") {
      endGame(false);
      return;
    }
    if (temp[index].content === 0) digAdjacent(temp[index], temp);
    temp.forEach((item) => {
      if (item.visible) item.flag = false;
      return item;
    });
    setTileArray(temp);
  }
  return (
    <div className="board">
      <h2>
        Flags: {flagAmount}, Bombs: {bombAmount}
      </h2>
      <table className="tile-table" onContextMenu={(e) => e.preventDefault()}>
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
                      quickDig={quickDig}
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
