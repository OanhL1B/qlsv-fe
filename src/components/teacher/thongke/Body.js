import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { MenuItem, Select } from "@mui/material";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";

import {
  getCourseTeacherKHM,
  getThongkebysomething,
} from "../../../redux/actions/teacherActions";

// http://localhost:9090/api/admin/dsLopTc/giangVien/GV004?maKeHoach=MKH1

const Body = () => {
  const [valueMKH, setValueMKH] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const khns = useSelector((state) => state.admin.allKHN);
  const user = JSON.parse(localStorage.getItem("teacherUser"));

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch({ type: "RESET_COURSE_GV_MKH" });
  }, []);
  useEffect(() => {
    if (valueMKH) {
      dispatch(
        getCourseTeacherKHM(user?.retObj?.userDetails?.username, valueMKH)
      );
    }
  }, [valueMKH]);

  const coursesbykhnmagv = useSelector(
    (state) => state?.teacher?.coursesbykhnmagv.retObj
  );

  // phần thống kê
  // http://localhost:9090/api/admin/diem/thong-ke?idLopTc=da6c6f34&col=XEPLOAI

  const [col, setCol] = useState("CC");
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    setCol("CC");
  }, [course]);
  useEffect(() => {
    if (course && col) {
      setLoading(true);
      const CourseObj = coursesbykhnmagv?.find((dp) => dp.maLopTc === course);
      const idLopTc = CourseObj?.id;
      dispatch(
        getThongkebysomething({
          params: {
            idLopTc,
            col,
          },
        })
      );
    }
  }, [course, col]);

  const thongkes = useSelector((state) => state.teacher.thongkes);

  useEffect(() => {
    if (thongkes?.length !== 0 || thongkes?.length === 0) {
      setLoading(false);
    }
  }, [thongkes]);

  useEffect(() => {
    if (!course) dispatch({ type: "CLEAR_THONGKES" });
  }, [course]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form className="flex flex-col col-span-1 space-y-2">
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Chọn học kỳ xem điểm:</span>
              <Select
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={valueMKH}
                onChange={(e) => setValueMKH(e.target.value)}
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px] mr-3"
              >
                <MenuItem value="">None</MenuItem>
                {khns?.map((khn, idx) => (
                  <MenuItem key={idx} value={khn.maKeHoach}>
                    {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp tín chỉ</span>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 720 }}
                inputProps={{ "aria-label": "Without label" }}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                MenuProps={{ PaperProps: { style: { maxHeight: 294 } } }}
                SelectDisplayProps={{ sx: { overflow: "auto" } }}
              >
                <MenuItem value="">None</MenuItem>
                {coursesbykhnmagv && coursesbykhnmagv.length > 0 ? (
                  coursesbykhnmagv.map((ut, idx) => (
                    <MenuItem key={idx} value={ut?.maLopTc}>
                      {"Mã LTC: "} {ut.maLopTc} {" - "} {"Môn học: "} {ut.tenMh}{" "}
                      {" - "}
                      {"Lớp: "} {ut.maLop}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No courses found</MenuItem>
                )}
              </Select>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full">
        <div className="item-center ">
          {course && (
            <div className="items-center rounded-lg">
              <form className="flex flex-col col-span-1 space-y-2">
                <label htmlFor="department">Biểu đồ Thống kê theo điểm: </label>

                <div className="flex">
                  <div>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36, width: 274 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={col}
                      onChange={(e) => setCol(e.target.value)}
                      className={`${classes.InputStyle} hover:focus:border-none w-[166px] text-center `}
                    >
                      <MenuItem value="CC">Chuyên cần</MenuItem>
                      <MenuItem value="GK">Giữa kỳ</MenuItem>
                      <MenuItem value="CK">Cuối kỳ</MenuItem>
                      <MenuItem value="TB">Trung bình</MenuItem>
                      <MenuItem value="XEPLOAI">Xếp loại</MenuItem>
                    </Select>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className={classes.loadingAndError}>
            {loading && thongkes?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
          </div>
          {!loading && thongkes.length > 0 && (
            <div className="flex justify-center w-full mt-10 mr-20 item-center ">
              <BarChart width={800} height={300} data={thongkes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis
                  label={{
                    value: "Số lượng",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Legend />

                <Bar
                  dataKey="soLuong"
                  fill="#8884d8"
                  barSize={30}
                  label={{
                    position: "top",
                  }}
                />
              </BarChart>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
