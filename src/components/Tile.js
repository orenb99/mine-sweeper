import React, { useState, useEffect } from "react";

function Tile({ tile }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="tile">
      <h1>{tile.content}</h1>
    </div>
  );
}

export default Tile;
