import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import {
  ADD_DANG_KY_MON,
  DELETE_DKM,
  SET_ERRORS,
} from "../../../redux/actionTypes";
import { format } from "date-fns";
import {
  dangKymon,
  deleteDkm,
  getAllCoursebysomething,
  getAllDsLtcSinhVien,
} from "../../../redux/actions/studentActions";

// http://localhost:9090/api/admin/dang-ky-mon
//http://localhost:9090/api/admin/dsLopTc?&maLop=D19CQCNPM01-N
// get danh sách lớp tín chỉ mà sinh viên đã đăng ký
// http://localhost:9090/api/admin/dsLopTc/sinhVien?maSv=N19DCCN135

const Body = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const store = useSelector((state) => state);
  const units = useSelector((state) => state.admin.allUnit);
  const user = JSON.parse(localStorage.getItem("studentUser"));

  const UnitObj = units?.find((dp) => dp.tenLop === unit);
  const UnitId = UnitObj?.maLop;

  const [value, setValue] = useState({
    maLop: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebysomething({
        params: {
          ...value,
          maLop: UnitId,
        },
      })
    );
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setIsLoading(false);
      setCheckedValue([]);
    }
  }, [store.errors]);
  const courses = useSelector((state) => state.student?.courses);

  useEffect(() => {
    if (courses?.length !== 0 || courses?.length === 0) {
      setLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    dispatch({ type: "RESET_COURSESDKMEDS" });
  }, []);

  // đăng ký môn
  const [checkedValue, setCheckedValue] = useState([]);
  const [checkedValueNew, setCheckedValueNew] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
    setCheckedValueNew((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const dangkymon = (e) => {
    dispatch(
      dangKymon({
        maSv: user?.retObj?.userDetails?.username,
        maLopTcList: checkedValue || checkedValueNew,
      })
    );
  };
  useEffect(() => {
    if (store.student.dangkymonAdded) {
      setCheckedValueNew([]);
      const UnitObj = units?.find((dp) => dp.tenLop === unit);
      const UnitId = UnitObj?.maLop;
      dispatch(
        getAllCoursebysomething({
          params: {
            ...value,
            maLop: UnitId,
          },
        })
      );
      dispatch({ type: ADD_DANG_KY_MON, payload: false });
    }
  }, [store.student.dangkymonAdded]);

  useEffect(() => {
    if (!unit) dispatch({ type: "RESET_COURSES" });
  }, [unit]);

  // api get danh sách lớp tín chỉ mà sinh viên đã đăng ký chỉ được gọi lại khi sinh viên đăng ký môn sinh viên chọn lớp sinh viên xóa
  useEffect(() => {
    if (!unit) return;
    dispatch(getAllDsLtcSinhVien(user?.retObj?.userDetails?.username));
  }, [unit, store.student.dangkymonAdded, store.student.deleteDkmed]);

  const coursesdkmeds = useSelector(
    (state) => state.student.coursesdkmeds.retObj
  );
  useEffect(() => {
    if (coursesdkmeds?.length !== 0 || coursesdkmeds?.length === 0) {
      setIsLoading(false);
    }
  }, [coursesdkmeds]);

  // hủy đăng ký môn
  const [checkedValueDeleteDkm, setCheckedValueDeleteDkm] = useState([]);

  const handleDeleteDkm = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValueDeleteDkm((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
    setCheckedValue((prevState) => prevState.filter((item) => item !== value));
  };

  const deletedangkymon = (e) => {
    if (!checkedValueDeleteDkm) return;
    dispatch(
      deleteDkm({
        maSv: user?.retObj?.userDetails?.username,
        maLopTcList: checkedValueDeleteDkm,
      })
    );
  };
  useEffect(() => {
    if (store.student.deleteDkmed) {
      setCheckedValueDeleteDkm([]);
      dispatch(getAllDsLtcSinhVien(user?.retObj?.userDetails?.username));

      dispatch(
        getAllCoursebysomething({
          params: {
            ...value,
            maLop: UnitId,
          },
        })
      );

      dispatch({ type: DELETE_DKM, payload: false });
    }
  }, [store.student.deleteDkmed]);

  return (
    <div className="flex-[0.8] mt-1 mx-5 item-center">
      <div className="items-center rounded-lg min-h-[64px]">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp</span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 284 }}
                inputProps={{ "aria-label": "Without label" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {units?.map((ut, idx) => (
                  <MenuItem key={idx} value={ut.tenLop}>
                    {ut.tenLop}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <button
              className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
              type="submit"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>

      <div className="w-full min-h-[200px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && units?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
          </div>
          {search && !loading && courses?.length !== 0 && (
            <table className="w-full table-auto">
              <thead className="bg-[#E1EEEE] items-center">
                <tr>
                  <th className="px-4 py-1" style={{ width: "15px" }}>
                    Chọn
                  </th>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1">Mã MH</th>
                  <th className="px-4 py-1 " style={{ width: "300px" }}>
                    Tên môn học
                  </th>
                  <th className="px-4 py-1">STC</th>
                  <th className="px-4 py-1 " style={{ width: "150px" }}>
                    Mã Lớp
                  </th>
                  <th className="px-4 py-1">Mã Lớp Tín Chỉ</th>
                  <th className="px-4 py-1">Sĩ Số</th>
                  <th className="px-4 py-1" style={{ width: "60px" }}>
                    CL
                  </th>
                  <th className="px-4 py-1" style={{ width: "200px" }}>
                    Giảng viên
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {courses?.map((course, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 borde " style={{ width: "15px" }}>
                      <input
                        onChange={handleInputChange}
                        checked={
                          checkedValue.includes(course.maLopTc) ||
                          coursesdkmeds?.some(
                            (coursesdkmed) => coursesdkmed.id === course.id
                          )
                        }
                        value={course.maLopTc}
                        type="checkbox"
                        className="accent-[#157572]"
                      />
                    </td>

                    <td className="px-4 py-1 border">{idx + 1}</td>
                    <td className="px-4 py-1 border">{course.maMh}</td>
                    <td className="px-4 py-1 border" style={{ width: "300px" }}>
                      {course.tenMh}
                    </td>
                    <td className="px-4 py-1 border">{course.soTc}</td>
                    <td
                      className="px-4 py-1 border "
                      style={{ width: "150px" }}
                    >
                      {course.maLop}
                    </td>
                    <td className="px-4 py-1 border">{course.maLopTc}</td>
                    <td className="px-4 py-1 border">{course.soLuong}</td>
                    <td className="px-4 py-1 border">{course.soLuongCon}</td>
                    <td className="px-4 py-1 border" style={{ width: "200px" }}>
                      {course.tenGv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="mt-2">
        {courses?.length > 0 && (
          <button
            onClick={dangkymon}
            className="items-center  mr-4 w-[150px] h-[26px] min-h-[26px] block font-bold hover:bg-[#04605E]  text-white rounded-lg px-4 
bg-[#157572] focus:outline-none focus:shadow-outline"
            disabled={!(checkedValueNew?.length > 0)}
          >
            Lưu Đăng Ký
          </button>
        )}
      </div>
      <div className="flex justify-between mt-2 mr-5">
        {coursesdkmeds?.length > 0 && (
          <h1 className="text-base text-text2"> DANH SÁCH MÔN HỌC ĐÃ CHỌN </h1>
        )}
        <div className="flex gap-x-3">
          {coursesdkmeds?.length > 0 && (
            <button
              className="items-center  w-[88px] h-[26px] block font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
              onClick={deletedangkymon}
              disabled={!(checkedValueDeleteDkm?.length > 0)}
            >
              Xóa
            </button>
          )}
        </div>
      </div>
      {coursesdkmeds?.length > 0 && (
        <div className="w-full">
          <div className="col-span-3">
            <div className={classes.loadingAndError}>
              {isLoading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {!isLoading && coursesdkmeds?.length === 0 && (
                <p className="text-2xl font-bold text-red-500">
                  Chưa có môn học nào được chọn
                </p>
              )}
            </div>
            {!isLoading && coursesdkmeds?.length > 0 && (
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">Mã MH</th>
                    <th className="px-4 py-1 " style={{ width: "300px" }}>
                      Tên môn học
                    </th>
                    <th className="px-4 py-1">STC</th>
                    <th className="px-4 py-1 " style={{ width: "150px" }}>
                      Mã Lớp
                    </th>
                    <th className="px-4 py-1">Mã Lớp Tín Chỉ</th>
                    <th className="px-4 py-1">Tên giảng viên</th>
                    <th className="px-4 py-1" style={{ width: "15px" }}>
                      Chọn
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {coursesdkmeds?.map((coursesdkmed, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 border">{idx + 1}</td>
                      <td className="px-4 py-1 border">{coursesdkmed.maMh}</td>
                      <td
                        className="px-4 py-1 border"
                        style={{ width: "300px" }}
                      >
                        {coursesdkmed.tenMh}
                      </td>
                      <td className="px-4 py-1 border">{coursesdkmed.soTc}</td>
                      <td
                        className="px-4 py-1 border "
                        style={{ width: "150px" }}
                      >
                        {coursesdkmed.maLop}
                      </td>
                      <td className="px-4 py-1 border">
                        {coursesdkmed.maLopTc}
                      </td>
                      <td className="px-4 py-1 border">{coursesdkmed.tenGv}</td>
                      <td
                        className="px-4 py-1 border "
                        style={{ width: "15px" }}
                      >
                        <input
                          onChange={handleDeleteDkm}
                          checked={checkedValueDeleteDkm.includes(
                            coursesdkmed.maLopTc
                          )}
                          value={coursesdkmed.maLopTc}
                          type="checkbox"
                          className="accent-[#7D1711]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
