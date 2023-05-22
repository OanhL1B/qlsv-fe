import React from "react";
import ReactModal from "react-modal";
import * as classes from "../../../utils/styles";
import { Avatar } from "@mui/material";
import { format } from "date-fns";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const DetailTeacher = ({ teacher, isOpen, onClose }) => {
  return (
    <ReactModal
      style={modalStyles}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="items-center justify-center">
        <div className="w-[808px] min-h-[100px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto">
          <div className="flex mt-10 mb-10 gap-x-16">
            {/* hình ảnh */}
            <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
              <Avatar
                src={teacher.hinhAnh}
                style={{ width: 220, height: 220 }}
              />
            </div>
            {/* thông tin chi tiết */}
            <div
              className="flex flex-row font-sans gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col font-sans gap-y-5"
                style={{ width: "130px", textAlign: "left" }}
              >
                <span className="font-sans">Mã giảng viên</span>
                <span className="font-sans">Họ và tên</span>
                <span className="font-sans">Giới tính</span>
                <span className="font-sans">Ngày Sinh</span>
                <span className="font-sans">Số điện thoại</span>
                <span className="font-sans">Email</span>
                <span className="font-sans">Khoa</span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "250px", textAlign: "left" }}
              >
                <span>{teacher.maGv}</span>
                <span>
                  {teacher.ho} {teacher.ten}
                </span>
                <span>{teacher.phai}</span>

                <span>{format(new Date(teacher.ngaySinh), "dd/MM/yyyy")}</span>
                <span>{teacher.sdt}</span>
                <span>{teacher.email}</span>
                <span>{teacher.maKhoa}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <button
              className={classes.adminFormClearButton}
              type="button"
              onClick={onClose}
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default DetailTeacher;
