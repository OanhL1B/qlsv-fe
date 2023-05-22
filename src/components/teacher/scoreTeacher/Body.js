import { MenuItem, Select } from "@mui/material";
import { SET_ERRORS, UPDATE_SCORE } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Spinner from "../../../utils/Spinner";
import {
  getCourseTeacherKHM,
  getScoreCourse,
  updateScore,
} from "../../../redux/actions/teacherActions";
//http://localhost:9090/api/admin/dsLopTc/giangVien/MAGV011?maKeHoach=MKH1

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
  const [valueMKH, setValueMKH] = useState("");
  const [course, setCourse] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

  // get score and sort
  const [sortType, setSortType] = useState("tenSv");
  const scores = useSelector((state) => state.admin.scores.retObj);
  const [sortedScores, setSortedScores] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSortType(value);
  };

  const sortScores = (scoresToSort) => {
    const sortedScores = [...scoresToSort];
    switch (sortType) {
      case "tenSv":
        sortedScores.sort((a, b) => {
          const lastNameA = a.tenSv.split(" ").pop();
          const lastNameB = b.tenSv.split(" ").pop();
          return lastNameA.localeCompare(lastNameB);
        });
        break;
      case "maSv":
        sortedScores.sort((a, b) => a.maSv.localeCompare(b.maSv));
        break;
      default:
        break;
    }
    return sortedScores;
  };
  // lấy được danh sách điểm của một lớp tín chỉ thuộc 1 giảng viên
  const handleSubmit = (e) => {
    if (!coursesbykhnmagv) return;
    e.preventDefault();
    setLoading(true);
    const CourseObj = coursesbykhnmagv?.find((dp) => dp.maLopTc === course);
    const CourseId = CourseObj?.maLopTc;
    dispatch(getScoreCourse(CourseId));
  };

  useEffect(() => {
    if (scores) {
      const newSortedScores = sortScores(scores);
      setSortedScores(newSortedScores);
    }
  }, [sortType, scores]);

  // const handleSubmit = (e) => {
  //   if (!coursesbykhnmagv) return;
  //   e.preventDefault();
  //   setLoading(true);
  //   const CourseObj = coursesbykhnmagv?.find((dp) => dp.maLopTc === course);
  //   const CourseId = CourseObj?.maLopTc;
  //   dispatch(getScoreCourse(CourseId));
  // };

  // const scores = useSelector((state) => state.teacher.scores.retObj);
  useEffect(() => {
    if (scores?.length !== 0 || scores?.length === 0) {
      setLoading(false);
    }
  }, [scores]);

  useEffect(() => {
    if (!valueMKH) dispatch({ type: "RESET_COURSE_GV_MKH" });
  }, [valueMKH]);

  useEffect(() => {
    if (!course) dispatch({ type: "RESET_SCORES" });
  }, [course]);

  //Begin edit
  const [value, setValue] = useState({
    id: "",
    cc: "",
    gk: "",
    ck: "",
    maSv: "",
    maLopTc: "",
  });
  const [selectedScore, setSelectedScore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEditClick = (score) => {
    setSelectedScore(score);
    setIsModalOpen(true);
    setValue({
      id: score.id,
      cc: "",
      gk: "",
      ck: "",
      maSv: score.maSv,
      maLopTc: score.maLopTc,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.cc !== "") {
      updatedValue.cc = value.cc;
    } else {
      updatedValue.cc = selectedScore.cc;
    }
    if (value.gk !== "") {
      updatedValue.gk = value.gk;
    } else {
      updatedValue.gk = selectedScore.gk;
    }
    if (value.ck !== "") {
      updatedValue.ck = value.ck;
    } else {
      updatedValue.ck = selectedScore.ck;
    }

    dispatch(updateScore({ ...selectedScore, ...updatedValue }));
    dispatch({ type: UPDATE_SCORE, payload: false });
    closeModal();
  };

  useEffect(() => {
    if (store.teacher.updateScore) {
      dispatch(getScoreCourse(selectedScore.maLopTc));
    }
  }, [dispatch, store.errors, store.teacher.updateScore]);
  console.log("scores", scores);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
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
                sx={{ height: 36, width: 550 }}
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
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No courses found</MenuItem>
                )}
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
      {scores && (
        <div className="flex gap-x-5 text-text2">
          <h1>Sắp xếp khi xuất danh sách </h1>
          <div>
            <input
              type="radio"
              value="maSv"
              checked={sortType === "maSv"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-text2">Theo mã sinh viên</span>
          </div>
          <div>
            <input
              type="radio"
              value="tenSv"
              checked={sortType === "tenSv"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Theo tên sinh viên
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && scores?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {scores?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp tín chỉ chưa nhập điểm
              </p>
            )}
          </div>

          {!loading && scores?.length > 0 && (
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center sticky top-0">
                  <tr>
                    <th className="px-4 py-1">STT</th>
                    <th className="px-4 py-1">Mã Sinh Viên</th>
                    <th className="px-4 py-1">Tên Sinh viên</th>
                    <th className="px-4 py-1">Chuyên Cần</th>
                    <th className="px-4 py-1">Giữa Kỳ</th>
                    <th className="px-4 py-1">Cuối Kỳ</th>
                    <th className="px-4 py-1">Trung Bình</th>
                    <th className="px-4 py-1">Xếp Loại</th>
                    <th className="px-4 py-1">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {sortedScores?.map((score, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-1 text-center border">
                        {idx + 1}
                      </td>

                      <td className="px-4 py-1 text-center border">
                        {score.maSv}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {score.tenSv}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {score.cc}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {score.gk}
                      </td>

                      <td className="px-4 py-1 text-center border">
                        {score.ck}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {score.tb}
                      </td>
                      <td className="px-4 py-1 text-center border">
                        {score.xepLoai}
                      </td>
                      <td
                        className="items-center justify-center px-4 py-1 mr-0 border"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          className="px-3 py-[0.6] font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                          onClick={() => handleEditClick(score)}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedScore ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-3 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã sinh viên:</h1>
                  <input
                    placeholder={selectedScore?.maSv}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maSv}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chuyên Cần :</h1>
                  <input
                    placeholder={selectedScore?.cc}
                    className={classes.InputStyle}
                    type="number"
                    value={value.cc}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        cc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giữa kỳ :</h1>
                  <input
                    placeholder={selectedScore?.gk}
                    className={classes.InputStyle}
                    type="number"
                    value={value.gk}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        gk: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Cuối kỳ :</h1>
                  <input
                    placeholder={selectedScore?.ck}
                    className={classes.InputStyle}
                    type="number"
                    value={value.ck}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        ck: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={classes.adminFormButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={closeModal}
                >
                  Thoát
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Body;
