import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDepartment,
  updateDepartment,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import { deleteDepartment } from "../../../redux/actions/adminActions";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  DELETE_DEPARTMENT,
  SET_ERRORS,
  UPDATE_DEPARTMENT,
} from "../../../redux/actionTypes";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  departments.sort((a, b) => a.tenKhoa.charCodeAt(0) - b.tenKhoa.charCodeAt(0));
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    maKhoa: "",
    tenKhoa: "",
    sdt: "",
    email: "",
    id: "",
  });
  const handleEditClick = (dep) => {
    setSelectedDepartment(dep);
    setIsModalOpen(true);
    setValue({
      sdt: "",
      tenKhoa: "",
      maKhoa: dep.maKhoa,
      email: dep.email,
      id: dep.id,
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
    if (value.tenKhoa !== "") {
      updatedValue.tenKhoa = value.tenKhoa;
    } else {
      updatedValue.tenKhoa = selectedDepartment.tenKhoa;
    }
    if (value.sdt !== "") {
      updatedValue.sdt = value.sdt;
    } else {
      updatedValue.sdt = selectedDepartment.sdt;
    }
    dispatch(updateDepartment({ ...selectedDepartment, ...updatedValue }));
    dispatch({ type: UPDATE_DEPARTMENT, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedDepartment) {
      setError({});
      closeModal();
      dispatch(getAllDepartment());
    }
  }, [dispatch, store.errors, store.admin.updatedDepartment]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // Begin delete
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
        dispatch(deleteDepartment(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.departmentDeleted) {
      setCheckedValue([]);
      dispatch(getAllDepartment());
      dispatch({ type: DELETE_DEPARTMENT, payload: false });
    }
  }, [store.admin.departmentDeleted]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/adddepartment" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {departments && checkedValue?.length > 0 ? (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
          >
            Xóa
          </button>
        ) : (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4"
            disabled
          >
            Xóa
          </button>
        )}
      </div>
      <div className="w-full my-8 mt-6">
        {departments?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">Chọn</th>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Mã Khoa</th>
                <th className="px-4 py-1">Tên Khoa</th>
                <th className="px-4 py-1">SĐT</th>
                <th className="px-4 py-1">Email</th>
                <th className="px-4 py-1">Hành động</th>
              </tr>
            </thead>
            <tbody className="">
              {departments?.map((dep, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  <td className="px-4 py-1 border">
                    <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    />
                  </td>
                  <td className="px-4 py-1 border">{idx + 1}</td>
                  <td className="px-4 py-1 border">{dep.maKhoa}</td>
                  <td className="px-4 py-1 border">{dep.tenKhoa}</td>
                  <td className="px-4 py-1 border">{dep.sdt}</td>
                  <td className="px-4 py-1 border">{dep.email}</td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(dep)}
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
      {/* modal edit */}
      {selectedDepartment ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã khoa :</h1>
                  <input
                    placeholder={selectedDepartment?.maKhoa}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên Khoa :</h1>
                  <input
                    placeholder={selectedDepartment?.tenKhoa}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenKhoa}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenKhoa: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số điện thoại :</h1>
                  <input
                    placeholder={selectedDepartment?.sdt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.sdt}
                    pattern="^(0[1-9]|1[0-9]|2[0-9]|3[2-9]|5[689])([0-9]{8})$"
                    title="Vui lòng nhập số điện thoại đúng định dạng."
                    onChange={(e) =>
                      setValue({
                        ...value,
                        sdt: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Email :</h1>
                  <input
                    placeholder={selectedDepartment?.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getdepartmentall" className="btn btn-primary">
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
