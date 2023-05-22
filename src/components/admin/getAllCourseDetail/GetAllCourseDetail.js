import { getAllKHN, getAllUnit } from "../../../redux/actions/adminActions";
import { useDispatch } from "react-redux";
import Body from "./Body";
import Header from "../Header";
import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
// getall theo lớp tín chỉ nha ví dụ 1 lớp tín chỉ có thế có 3 chi tiết lớp tín chỉ
const GetAllCourseDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUnit());
    dispatch(getAllKHN());
  }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default GetAllCourseDetail;
