import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useSelector } from "react-redux";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Calendar from "react-calendar";
import Clock from "react-clock";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import React, { useEffect, useState } from "react";
import SchoolIcon from "@mui/icons-material/School";

const Body = () => {
  const [value, onChange] = useState(new Date());
  const students = useSelector((state) => state.admin.allStudent);
  const units = useSelector((state) => state.admin.allUnit);
  const teachers = useSelector((state) => state.admin.allTeacher);
  const departments = useSelector((state) => state.admin.allDepartment);
  const courses = useSelector((state) => state.admin.allCourse);
  const subjects = useSelector((state) => state.admin.allSubject);

  /// clock
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
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Khoa</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{departments?.length}</h2>
                  <span>Tổng số khoa</span>
                </div>

                <div className="relative">
                  <AssignmentIndIcon
                    className="text-primary"
                    sx={{ fontSize: 60 }}
                  />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Lớp</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{units?.length}</h2>
                  <span>Tổng số lớp</span>
                </div>

                <div className="relative">
                  <SchoolIcon className="text-primary " sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Sinh Viên</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>

              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{students?.length}</h2>
                  <span>Tổng sinh viên</span>
                </div>

                <div className="relative">
                  <GroupIcon className="text-primary" sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Giảng viên</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{teachers?.length}</h2>
                  <span>Tổng Giảng Viên</span>
                </div>

                <div className="relative">
                  <GroupIcon className="text-primary " sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Lớp tín chỉ</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{courses?.length}</h2>
                  <span>Tổng số lớp tín chỉ</span>
                </div>

                <div className="relative">
                  <SchoolIcon className="text-primary " sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Môn Học</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold">{subjects?.length}</h2>
                  <span>Tổng môn học</span>
                </div>

                <div className="relative">
                  <MenuBookIcon
                    className="text-primary"
                    sx={{ fontSize: 60 }}
                  />
                </div>
              </div>
            </div>
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
