import React, { useState, useEffect } from "react";

function Timer({ over, started, setFinishTime }) {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [hrs, setHrs] = useState(0);
  useEffect(() => {
    if (over || !started) return;
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
  useEffect(() => {
    if (!over) return;
    setFinishTime(
      `${hrs < 10 ? "0" : ""}${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}`
    );
    setHrs(0);
    setMins(0);
    setSecs(0);
  }, [over]);
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
