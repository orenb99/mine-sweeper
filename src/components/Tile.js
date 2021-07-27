import React, { useState, useEffect } from "react";

function Tile({ tile, addFlag, dig }) {
  const [flagged, setFlagged] = useState(false);

  const flag = (e) => {
    e.preventDefault();
    if (flagged) addFlag(-1);
    else addFlag(1);
    setFlagged(!flagged);
  };

  return tile.visible ? (
    <button className="tile upside">{tile.content}</button>
  ) : (
    <button
      className="tile downside"
      onClick={() => dig(tile.row, tile.col)}
      onContextMenu={flag}
    >
      {flagged ? "flag" : "X"}
    </button>
  );
}

export default Tile;
