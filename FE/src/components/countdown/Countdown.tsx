'use client'
import React, { useEffect, useState } from "react";
import moment from "moment";

interface CountdownProps {
  dueDate: string; // Due date in ISO format, e.g., "2024-12-25T00:00:00Z"
}

const Countdown: React.FC<CountdownProps> = ({ dueDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const end = moment(dueDate);
      const duration = moment.duration(end.diff(now));

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [dueDate]);

  // Helper to format time units with leading zeros
  const formatTime = (unit: number) => unit.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-xl flex space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold bg-white rounded-md text-[#FC7D22] px-4">{formatTime(timeLeft.days)}</span>
          <span className="text-smid font-bold uppercase text-white mt-2">Ngày</span>
        </div>
        <span className="text-4xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold bg-white rounded-md text-[#FC7D22] px-4">{formatTime(timeLeft.hours)}</span>
          <span className="text-smid font-bold uppercase text-white mt-2">Giờ</span>
        </div>
        <span className="text-4xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold bg-white rounded-md text-[#FC7D22] px-4">{formatTime(timeLeft.minutes)}</span>
          <span className="text-smid font-bold uppercase text-white mt-2">Phút</span>
        </div>
        <span className="text-4xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold bg-white rounded-md text-[#FC7D22] px-4">{formatTime(timeLeft.seconds)}</span>
          <span className="text-smid font-bold uppercase text-white mt-2">Giây</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
