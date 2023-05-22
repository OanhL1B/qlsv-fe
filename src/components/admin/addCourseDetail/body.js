import { ADD_COURSE_DETAIL, SET_ERRORS } from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import {
  addCourseDetail,
  getAllCoursebyMKH,
} from "../../../redux/actions/adminActions";

// http://localhost:9090/api/admin/dsLopTc?maLop=D19CQCNPM01-N
// thêm lớp tín chỉ thì nó đã thêm theo kỳ mới nhất rồi nên k cần phải xét thêm điều kiện linh tinh nữa

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const units = useSelector((state) => state.admin.allUnit);
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    if (!UnitObj) return;
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebyMKH({
        params: {
          maLop: UnitId,
        },
      })
    );
  }, [unit]);

  const courses = useSelector((state) => state.admin.courses);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (!unit) dispatch({ type: "RESET_COURSES" });
  }, [unit]);

  const [value, setValue] = useState({
    tiet: "",
    thu: "",
    soTiet: "",
    phong: "",
    maLopTc: "",
    timeBd: "",
    timeKt: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addCourseDetail(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.coursedetailAdded) {
      setLoading(false);
      if (store.admin.coursedetailAdded) {
        setValue({
          tiet: "",
          thu: "",
          soTiet: "",
          phong: "",
          maLopTc: "",
          timeBd: "",
          timeKt: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_COURSE_DETAIL, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.coursedetailAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-1 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm chi tiết lớp tín chỉ</h1>
        </div>
        <Link to="/admin/coursedetail" className="btn btn-primary">
          <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className="flex gap-x-10">
          <div className={classes.WrapInputLabel}>
            <h1 className={classes.LabelStyle}>Lớp *:</h1>

            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 296 }}
              inputProps={{ "aria-label": "Without label" }}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
            >
              <MenuItem value="">None</MenuItem>
              {units?.map((ut, idx) => (
                <MenuItem key={idx} value={ut.tenLop}>
                  {ut.tenLop}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className={classes.WrapInputLabel}>
            <h1 className={classes.LabelStyle}>Chọn lớp tín Chỉ *:</h1>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 786 }}
              inputProps={{ "aria-label": "Without label" }}
              onChange={(e) => setValue({ ...value, maLopTc: e.target.value })}
              MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
              SelectDisplayProps={{ sx: { overflow: "auto" } }}
            >
              <MenuItem value="">None</MenuItem>

              {courses && courses.length > 0 ? (
                courses.map((ut, idx) => (
                  <MenuItem key={idx} value={ut.maLopTc}>
                    {"Mã LTC: "} {ut.maLopTc} {" - "} {"Môn học: "} {ut.tenMh}{" "}
                    {" - "} {"Giảng viên: "} {ut.tenGv}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No courses found</MenuItem>
              )}
            </Select>
          </div>
        </div>
        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tiết bắt đầu *:</h1>

                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.tiet}
                  onChange={(e) => setValue({ ...value, tiet: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Thứ *:</h1>

                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.thu}
                  onChange={(e) => setValue({ ...value, thu: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="02">Thứ 2</MenuItem>
                  <MenuItem value="03">Thứ 3</MenuItem>
                  <MenuItem value="04">Thứ 4</MenuItem>
                  <MenuItem value="05">Thứ 5</MenuItem>
                  <MenuItem value="06">Thứ 6</MenuItem>
                  <MenuItem value="07">Thứ 7</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số tiết *:</h1>

                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.soTiet}
                  onChange={(e) =>
                    setValue({ ...value, soTiet: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Phòng *:</h1>

                <input
                  placeholder="Phòng"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.phong}
                  onChange={(e) =>
                    setValue({ ...value, phong: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Thời gian bắt đầu *:</h1>
                <input
                  placeholder="Thời gian bắt đầu"
                  className={classes.InputStyle}
                  type="date"
                  value={value.timeBd}
                  onChange={(e) =>
                    setValue({ ...value, timeBd: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Thời gian kết thúc *:</h1>
                <input
                  placeholder="Thời gian kết thúc"
                  className={classes.InputStyle}
                  type="date"
                  value={value.timeKt}
                  onChange={(e) =>
                    setValue({ ...value, timeKt: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    tiet: "",
                    thu: "",
                    soTiet: "",
                    phong: "",
                    maLopTc: "",
                    timeBd: "",
                    timeKt: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm chi tiết lớp tín chỉ..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="157572"
                />
              )}

              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
