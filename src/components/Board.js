import React, { useState, useEffect } from "react";
import Tile from "./Tile";
function Board({ rows, cols }) {
  const [tileArray, setTileArray] = useState([]);
  useEffect(() => {
    setTileArray(new Array(rows * cols).fill(0));
  }, []);
  return (
    <div>
      <h1>Board</h1>
      <table>
        <tbody>
          {new Array(rows).fill(0).map((val, i) => (
            <tr>
              {new Array(cols).fill(0).map((val, j) => (
                <td>
                  <Tile row={i} col={j}/>
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
