import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Body from "./body";
import Header from "../Header";
import React from "react";
import Sidebar from "../Sidebar";
import {
  getAllSubject,
  getAllUnit,
  getAllTeacher,
  getAllKHN,
} from "../../../redux/actions/adminActions";

const AddCourse = () => {
  var value = {
    page: "0",
    size: "1000",
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUnit());
    dispatch(getAllSubject());
    dispatch(getAllKHN());

    dispatch(
      getAllTeacher({
        params: {
          ...value,
        },
      })
    );
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

export default AddCourse;
