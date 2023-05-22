import { ADD_COURSE, SET_ERRORS } from "../../../redux/actionTypes";
import { addCourse } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";

// lúc thêm kế hoạch năm mình đã set cứng mã kế hoạch là MKH1
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const units = useSelector((state) => state.admin.allUnit);
  const teachers = useSelector((state) => state.admin.allTeacher);
  const subjects = useSelector((state) => state.admin.allSubject);
  // const khns = useSelector((state) => state.admin.allKHN);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [value, setValue] = useState({
    maLopTc: "",
    maMh: "",
    maGv: "",
    maLop: "",
    soLuong: "",
    soLuongCon: "",
    maKeHoach: "MKH1",
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
    dispatch(addCourse(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.courseAdded) {
      setLoading(false);
      if (store.admin.courseAdded) {
        setValue({
          maLopTc: "",
          maMh: "",
          maGv: "",
          maLop: "",
          soLuong: "",
          soLuongCon: "",
          maKeHoach: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_COURSE, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.courseAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-1 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm lớp tín chỉ</h1>
        </div>
        <Link to="/admin/allcourse" className="btn btn-primary">
          <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Mã Lớp Tín Chỉ *:</h1>

                <input
                  placeholder="Mã Lớp Tín Chỉ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.maLopTc}
                  onChange={(e) =>
                    setValue({ ...value, maLopTc: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số lượng *:</h1>

                <input
                  placeholder="Số lượng"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.soLuong}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      soLuong: e.target.value,
                      soLuongCon: e.target.value,
                    })
                  }
                />
              </div>

              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Lớp *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maLop}
                  onChange={(e) =>
                    setValue({ ...value, maLop: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  {units?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.maLop}>
                      {dp.tenLop}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={`${classes.WrapInputLabel} `}>
                <h1 className={classes.LabelStyle}>Giảng Viên *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maGv}
                  onChange={(e) => setValue({ ...value, maGv: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none  `}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 324,
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {teachers?.map((teacher, idx) => (
                    <MenuItem key={idx} value={teacher.maGv}>
                      {teacher.ho} {teacher.ten}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Môn Học *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maMh}
                  onChange={(e) => setValue({ ...value, maMh: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 284,
                      },
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>

                  {subjects?.map((subject, idx) => (
                    <MenuItem key={idx} value={subject.maMh}>
                      {subject.tenMh}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              {/* <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Chọn học kỳ *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maKeHoach}
                  onChange={(e) =>
                    setValue({ ...value, maKeHoach: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">NONE</MenuItem>
                  {khns?.map((khn, idx) => (
                    <MenuItem key={idx} value={khn.maKeHoach}>
                      {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                    </MenuItem>
                  ))}
                </Select>
              </div> */}
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    maLopTc: "",
                    maMh: "",
                    maGv: "",
                    maLop: "",
                    soLuong: "",
                    soLuongCon: "",
                    maKeHoach: "",
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
                  message="Đang thêm lớp tín chỉ..."
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
