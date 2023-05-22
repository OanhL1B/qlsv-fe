import { ADD_UNIT, SET_ERRORS } from "../../../redux/actionTypes";
import { addUnit } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    tenLop: "",
    maLop: "",
    maKhoa: "",
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
    dispatch(addUnit(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.united) {
      setLoading(false);
      if (store.admin.united) {
        setValue({
          tenLop: "",
          maLop: "",
          maKhoa: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_UNIT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.united]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm Lớp học</h1>
        </div>
        <Link to="/admin/allUnit" className="">
          <button className="mt-5 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className="flex flex-col h-full bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-3 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên Lớp *:</h1>

                <input
                  placeholder="Tên Lớp"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.tenLop}
                  onChange={(e) =>
                    setValue({ ...value, tenLop: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Mã Lớp *:</h1>

                <input
                  placeholder="Mã lớp"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.maLop}
                  onChange={(e) =>
                    setValue({ ...value, maLop: e.target.value })
                  }
                />
              </div>

              <div className={classes.adminForm2r}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Khoa *:</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.maKhoa}
                    onChange={(e) =>
                      setValue({ ...value, maKhoa: e.target.value })
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maKhoa}>
                        {dp.tenKhoa}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    tenLop: "",
                    maLop: "",
                    maKhoa: "",
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
                  message="Đang thêm lớp..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
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
