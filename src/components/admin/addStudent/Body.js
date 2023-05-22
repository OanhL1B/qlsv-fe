import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import { addStudent } from "../../../redux/actions/adminActions";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import ImageUpload from "../../util/img/ImageUpload";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const units = useSelector((state) => state.admin.allUnit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    maSv: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    noiSinh: "",
    diaChi: "",
    sdt: "",
    email: "",
    maLop: "",
    maKhoa: "",
    hinhAnh: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Thêm ảnh không thành công!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    dispatch(addStudent(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          maSv: "",
          ho: "",
          ten: "",
          phai: "",
          ngaySinh: "",
          noiSinh: "",
          diaChi: "",
          sdt: "",
          email: "",
          maLop: "",
          maKhoa: "",
          hinhAnh: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.studentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-1 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm sinh viên</h1>
        </div>
        <Link to="/admin/student" className="btn btn-primary">
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
                <h1 className={classes.LabelStyle}>Mã Sinh Viên *:</h1>

                <input
                  placeholder="Mã Sinh Viên"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.maSv}
                  onChange={(e) => setValue({ ...value, maSv: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Họ *:</h1>

                <input
                  placeholder="Họ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.ho}
                  onChange={(e) => setValue({ ...value, ho: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên *:</h1>

                <input
                  placeholder="Tên"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.ten}
                  onChange={(e) => setValue({ ...value, ten: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Ngày Sinh *:</h1>
                <input
                  placeholder="Ngày Sinh"
                  className={classes.InputStyle}
                  type="date"
                  value={value.ngaySinh}
                  onChange={(e) =>
                    setValue({ ...value, ngaySinh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Email *:</h1>

                <input
                  placeholder="Email"
                  required
                  className={classes.InputStyle}
                  type="email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
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
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Giới tính *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.phai}
                  onChange={(e) => setValue({ ...value, phai: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Nơi Sinh *:</h1>

                <input
                  placeholder="Nơi Sinh"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.noiSinh}
                  onChange={(e) =>
                    setValue({ ...value, noiSinh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Địa chỉ *:</h1>

                <input
                  placeholder="Địa Chỉ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.diaChi}
                  onChange={(e) =>
                    setValue({ ...value, diaChi: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số điện thoại :</h1>

                <input
                  required
                  placeholder="Số điện thoại"
                  className={classes.InputStyle}
                  type="text"
                  value={value.sdt}
                  pattern="^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[6|8|9])([0-9]{8})$"
                  title="Vui lòng nhập số điện thoại đúng định dạng."
                  inputMode="numeric"
                  onChange={(e) => setValue({ ...value, sdt: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-6">
              <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                <Avatar
                  src={value.hinhAnh}
                  style={{ width: 180, height: 180 }}
                />
              </div>
              <div className="flex flex-col gap-y-5">
                <h1 className="pb-2 text-sm font-medium text-left">
                  Hình ảnh sinh viên:
                </h1>
                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>
            {/* button */}
            <div className="flex gap-x-10">
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Gửi
                </button>
                <button
                  onClick={() => {
                    setValue({
                      maSv: "",
                      ho: "",
                      ten: "",
                      phai: "",
                      ngaySinh: "",
                      noiSinh: "",
                      diaChi: "",
                      sdt: "",
                      email: "",
                      maLop: "",
                      maKhoa: "",
                      hinhAnh: "",
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
                    message="Đang thêm sinh viên...."
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
