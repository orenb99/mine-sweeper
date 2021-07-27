import React from "react";

function Tile({ row, col }) {
  return (
    <div>
      <h1>Tile {row + 1 + "X" + (col + 1)}</h1>
    </div>
  );
}

export default Tile;
