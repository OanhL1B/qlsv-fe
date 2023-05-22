import { getAllTKBStudent } from "../../../redux/actions/studentActions";
import { MenuItem, Select } from "@mui/material";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const store = useSelector((state) => state);
  const [valueMKH, setValueMKH] = useState({ maKeHoach: "" });
  const [value, setValue] = useState({ tuan: "1" });

  const user = JSON.parse(localStorage.getItem("studentUser"));
  const khns = useSelector((state) => state.student.khns);
  const khntiem = khns?.find((item) => item?.maKeHoach === valueMKH?.maKeHoach);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleKyChange = (e) => {
    setValueMKH({ ...valueMKH, maKeHoach: e.target.value });
  };

  useEffect(() => {
    if (valueMKH.maKeHoach !== "") {
      const selectedKHN = khns.find(
        (item) => item.maKeHoach === valueMKH.maKeHoach
      );
      if (selectedKHN) {
        const timeStudyBegin = new Date(selectedKHN.timeStudyBegin);
        const timeStudyEnd = new Date(selectedKHN.timeStudyEnd);
        const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
        const weeks = Math.ceil(
          (timeStudyEnd - timeStudyBegin) / millisecondsPerWeek
        );
        setNumberOfWeeks(weeks);
      }
    }
  }, [valueMKH.maKeHoach, khns]);
  const handleTuanChange = (e) => {
    setValue({ ...value, tuan: e.target.value });
  };

  useEffect(() => {
    const latestKHN = khns[0];
    if (latestKHN) {
      setValueMKH({ maKeHoach: latestKHN.maKeHoach });
    }
  }, [khns]);

  useEffect(() => {
    if (valueMKH.maKeHoach !== "" || value.tuan !== "") {
      setError({});
      dispatch(
        getAllTKBStudent(
          user?.retObj?.userDetails?.username,
          value?.tuan,
          valueMKH?.maKeHoach
        )
      );
    }
  }, [valueMKH.maKeHoach, value.tuan]);

  const studenttkbs = useSelector(
    (state) => state.student?.studenttkbs?.retObj
  );
  const [monday, tuesday, wednesday, thursday, friday, saturday] =
    studenttkbs || "";

  useEffect(() => {
    dispatch({ type: "RESET_TKBS" });
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const min = 1;
  const max = numberOfWeeks;
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const getStartDateOfWeek = (weekNumber) => {
    const startDate = new Date(khntiem?.timeStudyBegin);
    startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    return startDate;
  };
  const getEndDateOfWeek = (weekNumber) => {
    const endDate = new Date(khntiem?.timeStudyBegin);
    endDate.setDate(endDate.getDate() + (weekNumber - 1) * 7 + 6);
    return endDate;
  };
  return (
    <div className="">
      <div className="mx-5 mt-3 item-center">
        <div className="space-y-5">
          <div className="items-center justify-center my-8 mt-2 mb-2 rounded-lg">
            <form className="flex flex-col items-center justify-center">
              <div className="flex flex-col gap-3">
                <div className="flex gap-x-3">
                  <span className="items-center my-auto mb-1 text-text2 flex-[1]">
                    Chọn học kỳ xem TKB:
                  </span>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 324 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={valueMKH.maKeHoach}
                    onChange={handleKyChange}
                    className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px]"
                  >
                    <MenuItem value="">None</MenuItem>
                    {khns?.map((khn, idx) => (
                      <MenuItem key={idx} value={khn.maKeHoach}>
                        {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="flex gap-x-3">
                  <span className="items-center my-auto mb-1 text-text2 flex-[1]">
                    TKB theo tuần:
                  </span>
                  <Select
                    displayEmpty
                    sx={{ height: 36, width: 354 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.tuan}
                    onChange={handleTuanChange}
                    className=" h-10 bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px]"
                    MenuProps={{
                      style: {
                        maxHeight: "400px",
                      },
                    }}
                  >
                    {numbers.map((item, index) => {
                      const startDate = getStartDateOfWeek(item);
                      const endDate = getEndDateOfWeek(item);

                      return (
                        <MenuItem key={index} value={item}>
                          Tuần {item} {"  "} [Từ{" "}
                          {startDate.toLocaleDateString("en-GB")} -- Đến{" "}
                          {endDate.toLocaleDateString("en-GB")}]
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-10 mt-20">
        <table
          className="w-full h-full border border-gray-300 border-solid min-h-[320px]"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-[#E1EEEE] items-center justify-center border border-gray-900">
            <tr className="h-5">
              <td className="items-center justify-center px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 2</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 3</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 4</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 5</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 6</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>THỨ 7</span>
              </td>
              <td className="px-4 py-2 border border-gray-900 whitespace-nowrap">
                <span>CHỦ NHẬT</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td
                className="relative border border-gray-500 border-solid "
                data-tooltip-id="tooltip-monday-morning"
                data-tooltip-place="bottom"
              >
                {monday && monday.tkbDtoList?.length > 0 && (
                  <div className="p-2 py-6 text-base text-text2">
                    {monday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>

              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-tuesday-morning"
                data-tooltip-place="bottom"
              >
                {tuesday && tuesday.tkbDtoList?.length > 0 && (
                  <div className="p-2 py-6 text-base text-text2">
                    {tuesday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-wednesday-morning"
                data-tooltip-place="bottom"
              >
                {wednesday && wednesday.tkbDtoList.length > 0 && (
                  <div className="p-2 py-6 text-base text-text2">
                    {wednesday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-thursday-morning"
                data-tooltip-place="bottom"
              >
                {thursday && thursday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {thursday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-friday-morning"
                data-tooltip-place="bottom"
              >
                {friday && friday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {friday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-saturday-morning"
                data-tooltip-place="bottom"
              >
                {saturday && saturday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {saturday.tkbDtoList.map((object) =>
                      object.tiet === 1 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td className="border border-gray-500 border-solid w-110"></td>
            </tr>
            <tr>
              <td className="border border-gray-500 border-solid w-110">
                {monday && monday.tkbDtoList && (
                  <div
                    className="p-2 py-6 text-base text-text2"
                    data-tooltip-id="tooltip-monday-after"
                    data-tooltip-place="bottom"
                  >
                    {monday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-tuesday-after"
                data-tooltip-place="bottom"
              >
                {tuesday && tuesday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {tuesday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td className="border border-gray-500 border-solid w-110">
                {wednesday && wednesday.tkbDtoList && (
                  <div
                    className="p-2 py-6 text-base text-text2"
                    data-tooltip-id="tooltip-wednesday-after"
                    data-tooltip-place="bottom"
                  >
                    {wednesday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-thursday-after"
                data-tooltip-place="bottom"
              >
                {thursday && thursday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {thursday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-friday-after"
                data-tooltip-place="bottom"
              >
                {friday && friday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {friday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td
                className="border border-gray-500 border-solid w-110"
                data-tooltip-id="tooltip-saturday-after"
                data-tooltip-place="bottom"
              >
                {saturday && saturday.tkbDtoList && (
                  <div className="p-2 py-6 text-base text-text2">
                    {saturday.tkbDtoList.map((object) =>
                      object.tiet === 5 ? (
                        <div>
                          <h3>{object.tenMh}</h3>
                          <div>phòng: {object.phong}</div>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </td>
              <td className="border border-gray-500 border-solid w-110"></td>
            </tr>
          </tbody>
        </table>
        {/* morning */}
        <Tooltip
          id="tooltip-monday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {monday && monday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {monday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-tuesday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {tuesday && tuesday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {tuesday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-wednesday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {wednesday && wednesday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {wednesday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-thursday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {thursday && thursday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {thursday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-friday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {friday && friday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {friday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-saturday-morning"
          className="absolute top-0 left-0 mt-[-60px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {saturday && saturday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {saturday.tkbDtoList.map((object) =>
                object.tiet === 1 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>

        {/*afternoon  */}
        <Tooltip
          id="tooltip-monday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {monday && monday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {monday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-tuesday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {tuesday && tuesday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {tuesday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-wednesday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {wednesday && wednesday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {wednesday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-thursday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {thursday && thursday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {thursday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-friday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {friday && friday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {friday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
        <Tooltip
          id="tooltip-saturday-after"
          className="absolute top-0 left-0 mt-[40px] tooltip bg-slate-200 "
          style={{
            backgroundColor: "#E1EEEE",
            color: "#ffffff",
          }}
        >
          {saturday && saturday.tkbDtoList && (
            <div className="p-2 py-6 text-base text-text2 ">
              {saturday.tkbDtoList.map((object) =>
                object.tiet === 5 ? (
                  <div key={object.id}>
                    <h3> Mã môn học: {object.maMh}</h3>
                    <div>Tên MH: {object.tenMh}</div>
                    <div>phòng: {object.phong}</div>
                    <div>Thứ: {object.thu}</div>
                    <div>Tiết bắt đầu: {object.tiet}</div>
                    <div>Số tiết: {object.soTiet}</div>
                    <div>Giảng Viên: {object.tenGv}</div>
                    <div>Lớp: {object.maLop}</div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export default Body;
