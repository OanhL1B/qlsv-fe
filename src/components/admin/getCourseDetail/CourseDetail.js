import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import * as classes from "../../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourseDetailCourse } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";

const modalStyles = {
  content: {
    top: "55%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};

const CourseDetail = ({ course, isOpen, onClose }) => {
  const { maLopTc, tenMh, tenGv } = course;
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!maLopTc) return;
    if (!isOpen) return;
    dispatch(getAllCourseDetailCourse(maLopTc));
    setIsLoading(true);
  }, [dispatch, maLopTc, isOpen]);

  const coursedetails = useSelector(
    (state) => state?.admin?.coursedetails.retObj
  );

  useEffect(() => {
    if (coursedetails?.length > 0) {
      setIsLoading(false);
    }
  }, [coursedetails]);
  useEffect(() => {
    if (coursedetails && coursedetails?.length === 0) {
      setIsLoading(false);
    }
  }, [coursedetails]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  const handleReset = () => {
    onClose();
    dispatch({ type: "RESET_COURSEDETAILS" });
  };

  return (
    <ReactModal
      style={modalStyles}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex-[0.8] mt-3 mx-5 item-center w-[1000px] h-[500px]">
        <div className="flex items-center justify-end gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={handleReset}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex gap-x-2">
          <div className="text-base font-bold text-text1">
            Môn học:{" "}
            <span className="text-base font-normal text-text2">{tenMh} </span>
          </div>
          <div className="text-base font-bold text-text1">
            Mã lớp tín chỉ: {"  "}{" "}
            <span className="text-base font-normal text-text2">{maLopTc} </span>
          </div>
          <div className="text-base font-bold text-text1">
            Tên giảng viên: {"  "}{" "}
            <span className="text-base font-normal text-text2">{tenGv}</span>
          </div>
        </div>

        <p className="block mt-2 text-black">Danh sách chi tiết lớp tín chỉ:</p>

        <div className="w-full">
          <div className="col-span-3">
            <div className={classes.loadingAndError}>
              {isloading ? (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              ) : !isloading && coursedetails?.length === 0 ? (
                <p className="text-2xl font-bold text-red-500">
                  Lớp tín chỉ chưa có chi tiết lớp tín chỉ
                </p>
              ) : null}
              {/* {coursedetails?.length === 0 && isloading === false && (
                <p className="text-2xl font-bold text-red-500">
                  Lớp tín chỉ chưa có chi tiết lớp tín chỉ
                </p>
              )} */}
            </div>

            {!isloading && coursedetails?.length > 0 && (
              <table className="items-center justify-center w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Tiết bắt đầu</th>
                    <th className="px-4 py-2">Phòng</th>
                    <th className="px-4 py-2">Số tiết</th>
                    <th className="px-4 py-2">Thứ</th>
                  </tr>
                </thead>
                <tbody className="">
                  {coursedetails?.map((coursedetail, idx) => (
                    <tr
                      className="justify-center items-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="items-center px-4 py-2 border">
                        {idx + 1}
                      </td>
                      <td className="items-center px-4 py-2 border">
                        {coursedetail.tiet}
                      </td>
                      <td className="items-center px-4 py-2 border">
                        {coursedetail.phong}
                      </td>
                      <td className="items-center px-4 py-2 border">
                        {coursedetail.soTiet}
                      </td>
                      {/* <td className="px-4 py-2 border">{coursedetail.thu}</td> */}
                      {coursedetail.thu === "01" && (
                        <td className="px-4 py-2 border">Thứ 2</td>
                      )}
                      {coursedetail.thu === "02" && (
                        <td className="px-4 py-2 border">Thứ 3</td>
                      )}
                      {coursedetail.thu === "03" && (
                        <td className="px-4 py-2 border">Thứ 4</td>
                      )}
                      {coursedetail.thu === "04" && (
                        <td className="px-4 py-2 border">Thứ 5</td>
                      )}
                      {coursedetail.thu === "05" && (
                        <td className="px-4 py-2 border">Thứ 6</td>
                      )}
                      {coursedetail.thu === "06" && (
                        <td className="px-4 py-2 border">Thứ 7</td>
                      )}
                      {coursedetail.thu === "07" && (
                        <td className="px-4 py-2 border">Thứ 8</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CourseDetail;
