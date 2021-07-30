import React, { useState, useEffect } from "react";

function Timer({ startTime }) {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [hrs, setHrs] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      if (secs < 60) {
        setSecs(secs + 1);
      } else {
        setSecs(0);
        if (mins < 60) setMins(mins + 1);
        else {
          setMins(0);
          setHrs(hrs + 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div>
      <h1>Timer</h1>
      <h1>{`${hrs < 10 ? "0" : ""}${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}`}</h1>
    </div>
  );
}

export default Timer;
