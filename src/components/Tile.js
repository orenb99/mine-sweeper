import React, { useState, useEffect } from "react";

function Tile({ tile, addFlag, dig, quickDig }) {
  const flag = (e) => {
    e.preventDefault();
    addFlag(tile);
  };

  return tile.visible ? (
    <button
      className={"tile upside n" + tile.content}
      onContextMenu={(e) => {
        e.preventDefault();
        quickDig(tile);
      }}
    >
      {tile.content !== 0 ? tile.content : ""}
    </button>
  ) : (
    <button
      className="tile downside"
      onClick={() => dig(tile.row, tile.col)}
      onContextMenu={flag}
    >
      {tile.flag ? "flag" : ""}
    </button>
  );
}

export default Tile;
