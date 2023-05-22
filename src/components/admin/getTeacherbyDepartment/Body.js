import { Avatar } from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import DetailTeacher from "../DetailTeacher/DetailTeacher";
import ImageUpload from "../../util/img/ImageUpload";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import Swal from "sweetalert2";

import {
  DELETE_TEACHER,
  SET_ERRORS,
  UPDATE_TEACHER,
} from "../../../redux/actionTypes";
import {
  deleteTeacher,
  getTeacherDepartment,
  updateTeacher,
} from "../../../redux/actions/adminActions";

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

  // paging
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const itemsPerPage = 12;

  // phục vụ xóa
  const departmentObj = departments?.find((dp) => dp.tenKhoa === department);
  const departmentId = departmentObj?.maKhoa;

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (!department) dispatch({ type: "RESET_TEACHERS" });
  }, [department]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const departmentObj = departments?.find((dp) => dp.tenKhoa === department);
    if (!departmentObj) return;
    const departmentId = departmentObj?.maKhoa;
    dispatch(getTeacherDepartment(departmentId, nextPage, itemsPerPage));
  };

  const teachers = useSelector((state) => state.admin.teachers.retObj);
  teachers?.sort((a, b) => a.maGv.localeCompare(b.maGv));

  const dataPagine = useSelector((state) => state.admin.teachers);

  useEffect(() => {
    if (teachers?.length !== 0 || teachers?.length === 0) {
      setLoading(false);
    }
  }, [teachers]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //Begin edit
  const [inputType, setInputType] = useState("text");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState({
    id: "",
    maGv: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    trangThai: null,
    sdt: "",
    email: "",
    maKhoa: "",
    hinhAnh: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Upload Image error!");
  };
  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: teacher.id,
      maGv: teacher.maGv,
      ho: "",
      ten: "",
      phai: "",
      ngaySinh: "",
      trangThai: teacher.trangThai,
      sdt: "",
      email: teacher.email,
      maKhoa: "",
      hinhAnh: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.ho !== "") {
      updatedValue.ho = value.ho;
    } else {
      updatedValue.ho = selectedTeacher.ho;
    }
    if (value.ten !== "") {
      updatedValue.ten = value.ten;
    } else {
      updatedValue.ten = selectedTeacher.ten;
    }
    if (value.phai !== "") {
      updatedValue.phai = value.phai;
    } else {
      updatedValue.phai = selectedTeacher.phai;
    }
    if (value.ngaySinh !== "") {
      updatedValue.ngaySinh = value.ngaySinh;
    } else {
      updatedValue.ngaySinh = selectedTeacher.ngaySinh;
    }
    if (value.sdt !== "") {
      updatedValue.sdt = value.sdt;
    } else {
      updatedValue.sdt = selectedTeacher.sdt;
    }
    if (value.maKhoa !== "") {
      updatedValue.maKhoa = value.maKhoa;
    } else {
      updatedValue.maKhoa = selectedTeacher.maKhoa;
    }
    if (value.hinhAnh !== "") {
      updatedValue.hinhAnh = value.hinhAnh;
    } else {
      updatedValue.hinhAnh = selectedTeacher.hinhAnh;
    }

    dispatch(updateTeacher({ ...selectedTeacher, ...updatedValue }));
    dispatch({ type: UPDATE_TEACHER, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedTeacher) {
      setError({});
      closeModal();
      dispatch(
        getTeacherDepartment(selectedTeacher.maKhoa, nextPage, itemsPerPage)
      );
    }
  }, [dispatch, store.errors, store.admin.updatedTeacher]);

  //End edit

  // Begin view
  const handleOpenViewModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalMode("view");
    setIsModalOpen(true);
  };
  //End view

  // Begin  delete
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
        dispatch(deleteTeacher(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.teacherDeleted) {
      setCheckedValue([]);
      const departmentObj = departments?.find(
        (dp) => dp.tenKhoa === department
      );
      const departmentId = departmentObj?.maKhoa;
      dispatch(getTeacherDepartment(departmentId, nextPage, itemsPerPage));
      dispatch({ type: DELETE_TEACHER, payload: false });
    }
  }, [store.admin.teacherDeleted]);

  useEffect(() => {
    if (!store.errors) return;
    if (!departmentId) return;

    dispatch(getTeacherDepartment(departmentId, nextPage, itemsPerPage));
  }, [store.errors]);

  // End edit

  //Paging
  useEffect(() => {
    if (!dataPagine || !dataPagine.totalPages) return;
    setPageCount(Math.ceil(dataPagine.totalRetObjs / itemsPerPage));
  }, [dataPagine, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPagine.totalRetObjs;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1 - 1);
  };

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/admin/addteacher" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {teachers && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(teachers && checkedValue?.length > 0)}
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
          <label htmlFor="department">
            Chọn Khoa để xem danh sách giảng viên:
          </label>

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

      <div className="w-full min-h-[427px]">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && teachers?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {teachers?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Khoa chưa có giảng viên
              </p>
            )}
          </div>

          {search && !loading && teachers?.length !== 0 && (
            <table className="w-full table-auto">
              <thead className="bg-[#E1EEEE] items-center">
                <tr>
                  <th className="px-4 py-1">Chọn</th>
                  <th className="px-4 py-1">STT</th>
                  <th className="px-4 py-1">Mã Giảng Viên</th>
                  <th className="px-4 py-1">Họ</th>
                  <th className="px-4 py-1">Tên</th>

                  <th className="px-4 py-1">Email</th>
                  <th className="px-4 py-1" style={{ width: "170px" }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {teachers?.map((teacher, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-1 border">
                      <input
                        onChange={handleInputChange}
                        checked={checkedValue.includes(teacher.id)}
                        value={teacher.id}
                        type="checkbox"
                        className="accent-[#157572]"
                      />
                    </td>
                    <td className="px-4 py-1 border">{idx + 1}</td>

                    <td className="px-4 py-1 border">{teacher.maGv}</td>
                    <td className="px-4 py-1 border">{teacher.ho}</td>
                    <td className="px-4 py-1 border">{teacher.ten}</td>

                    <td className="px-4 py-1 border">{teacher.email}</td>

                    <td
                      className="items-center justify-center px-4 py-1 mr-0 border"
                      style={{ width: "170px" }}
                    >
                      <button
                        className="px-3 py-[0.6] mr-5 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572]  focus:outline-none focus:shadow-outline"
                        onClick={() => handleOpenViewModal(teacher)}
                      >
                        Xem
                      </button>
                      {modalMode === "view" && (
                        <DetailTeacher
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          teacher={selectedTeacher}
                        />
                      )}

                      <button
                        className="px-3 py-[0.6] font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                        onClick={() => handleEditClick(teacher)}
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
      {modalMode === "edit" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className={classes.Form1}>
            <form className={classes.Form2} onSubmit={handleFormSubmit}>
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã giảng viên:</h1>
                  <input
                    placeholder={selectedTeacher.maGv}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}> Họ:</h1>
                  <input
                    placeholder={selectedTeacher.ho}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ho}
                    onChange={(e) => setValue({ ...value, ho: e.target.value })}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    placeholder={selectedTeacher.ten}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ten}
                    onChange={(e) =>
                      setValue({ ...value, ten: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Phái :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.phai || selectedTeacher.phai}
                    onChange={(e) =>
                      setValue({ ...value, phai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ngày Sinh :</h1>

                  <input
                    placeholder={format(
                      new Date(selectedTeacher.ngaySinh),
                      "MM/dd/yyyy"
                    )}
                    className={classes.InputStyle}
                    type={inputType}
                    value={value.ngaySinh}
                    onChange={(e) =>
                      setValue({ ...value, ngaySinh: e.target.value })
                    }
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Điện thoại :</h1>
                  <input
                    placeholder={selectedTeacher.sdt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.sdt}
                    onChange={(e) =>
                      setValue({ ...value, sdt: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Email :</h1>
                  <input
                    placeholder={selectedTeacher.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Khoa :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.maKhoa || selectedTeacher.maKhoa}
                    onChange={(e) =>
                      setValue({ ...value, maLop: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maKhoa}>
                        {dp.tenKhoa}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                  <Avatar
                    src={value.hinhAnh || selectedTeacher.hinhAnh}
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

              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      )}
      {/* pagination */}
      {teachers?.length > 0 && (
        <div className="flex items-center justify-center w-full mt-2 mb-1">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Body;
