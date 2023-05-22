import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const Body = () => {
  const [value, onChange] = useState(new Date());
  const [valueDate, setValueDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValueDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // timer
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return { hours, minutes, seconds };
  };
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400 ">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 gap-x-10">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            chỗ này để dành cho thằng thời khóa biểu nhé
          </div>

          <div className="flex flex-col w-full space-y-4">
            <div className="w-full bg-white shadow-lg rounded-xl">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="justify-center ">
              <div>
                Giờ hiện tại là:{" "}
                <strong>
                  {currentTime.hours.toString().padStart(2, "0")}:
                  {currentTime.minutes.toString().padStart(2, "0")}:
                  {currentTime.seconds.toString().padStart(2, "0")}
                </strong>
              </div>
              <Clock value={valueDate} className="mx-auto mt-5 p-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
