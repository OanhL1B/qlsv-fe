import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";
import {
  DELETE_UNIT,
  SET_ERRORS,
  UPDATE_UNIT,
} from "../../../redux/actionTypes";
import {
  deleteUnit,
  getUnitDepartment,
  updateUnit,
} from "../../../redux/actions/adminActions";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  departments?.sort(
    (a, b) => a.tenKhoa.charCodeAt(0) - b.tenKhoa.charCodeAt(0)
  );
  // phục vụ xóa
  const departmentObj = departments?.find((dp) => dp.tenKhoa === department);
  const departmentId = departmentObj?.maKhoa;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const departmentObj = departments.find((dp) => dp.tenKhoa === department);
    const departmentId = departmentObj?.maKhoa;
    dispatch(getUnitDepartment(departmentId));
  };

  const units = useSelector((state) => state.admin.units.retObj);
  units?.sort((a, b) => a.tenLop.charCodeAt(0) - b.tenLop.charCodeAt(0));

  useEffect(() => {
    if (units?.length !== 0 || units?.length === 0) {
      setLoading(false);
    }
  }, [units]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);
  useEffect(() => {
    if (!department) dispatch({ type: "RESET_UNITS" });
  }, [department]);

  // Begin edit
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    tenLop: "",
    maLop: "",
    maKhoa: "",
    id: "",
  });

  const handleEditClick = (unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
    setValue({
      tenLop: "",
      maLop: unit?.maLop,
      maKhoa: unit?.maKhoa,
      id: unit?.id,
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedValue = {};
    if (value.tenLop !== "") {
      updatedValue.tenLop = value.tenLop;
    } else {
      updatedValue.tenLop = selectedUnit.tenLop;
    }
    dispatch(updateUnit({ ...selectedUnit, ...updatedValue }));
    dispatch({ type: UPDATE_UNIT, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedUnit) {
      setError({});
      closeModal();
      dispatch(getUnitDepartment(selectedUnit.maKhoa));
    }
  }, [dispatch, store.errors, store.admin.updatedUnit]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // BEGIN DELETE
  const [checkedValue, setCheckedValue] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  const dltSubject = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteUnit(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.unitDeleted) {
      setLoading(false);
      setCheckedValue([]);
      const departmentObj = departments.find((dp) => dp.tenKhoa === department);
      const departmentId = departmentObj.maKhoa;
      dispatch(getUnitDepartment(departmentId));
      dispatch({ type: DELETE_UNIT, payload: false });
    }
  }, [store.admin.unitDeleted]);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      dispatch(getUnitDepartment(departmentId));
    }
  }, [store.errors]);

  //End delete

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addunit" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>

        {units && units.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(units && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="department">Chọn khoa để xem danh sách lớp:</label>

          <div className="flex">
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 284 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.tenKhoa}>
                  {dp.tenKhoa}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56 ml-3`}
              type="submit"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>

      <div className="w-full">
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
            {units?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Khoa chưa có lớp
              </p>
            )}
          </div>

          {search && !loading && units?.length !== 0 && (
            <table className="w-full table-auto">
              <thead className="bg-[#E1EEEE] items-center">
                <tr>
                  <th className="px-4 py-2">Chọn</th>
                  <th className="px-4 py-2">STT</th>
                  <th className="px-4 py-2">Mã Lớp</th>
                  <th className="px-4 py-2">Tên Lớp</th>
                  <th className="px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {units?.map((unit, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-2 border">
                      <input
                        onChange={handleInputChange}
                        checked={checkedValue.includes(unit.id)}
                        value={unit.id}
                        type="checkbox"
                        className="accent-[#157572]"
                      />
                    </td>
                    <td className="px-4 py-2 border">{idx + 1}</td>

                    <td className="px-4 py-2 border">{unit.maLop}</td>
                    <td className="px-4 py-2 border">{unit.tenLop}</td>
                    <td
                      className="items-center justify-center px-4 py-2 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                        onClick={() => handleEditClick(unit)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* modal edit */}
      {selectedUnit ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col h-full bg-white rounded-xl">
            <form
              className="min-w-[685px] min-h-[300px] py-7 px-7 text-center bg-[#fff]  rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-2 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Lớp :</h1>
                  <input
                    placeholder={selectedUnit?.maLop}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maLop}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên Lớp :</h1>
                  <input
                    placeholder={selectedUnit?.tenLop}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenLop}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenLop: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/allUnit" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Body;
