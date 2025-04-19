import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.reload();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold", display: "flex", flexDirection: "column", alignItems: "center" }}>
      Time remaining before refresh: {formatTime(timeLeft)}
      <a className="text-xl font-thin text-[#ffd700] underline" href="/diiaAuth">Get new code</a>
    </div>
  );
};

export default Timer;
