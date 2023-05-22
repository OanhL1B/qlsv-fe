import { toast } from "react-toastify";
import {
  ADD_COURSE_DETAIL,
  ADD_COURSE,
  ADD_DEPARTMENT,
  ADD_STUDENT,
  ADD_SUBJECT,
  ADD_TEACHER,
  ADD_UNIT,
  DELETE_COURSE,
  DELETE_DEPARTMENT,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  DELETE_TEACHER,
  DELETE_UNIT,
  GET_ALL_COURSE_DETAIL,
  GET_ALL_COURSE,
  GET_ALL_DEPARTMENT,
  GET_ALL_STUDENT,
  GET_ALL_SUBJECT,
  GET_ALL_TEACHER,
  GET_ALL_UNIT,
  GET_COURSE_UNIT,
  GET_SCORE_COURSE,
  GET_STUDENT_BY_ID,
  GET_STUDENT_UNIT,
  GET_TEACHER_DEPARTMENT,
  GET_UNIT_DEPARTMENT,
  SET_ERRORS,
  UPDATE_COURSE,
  UPDATE_DEPARTMENT,
  UPDATE_STUDENT,
  UPDATE_SUBJECT,
  UPDATE_TEACHER,
  UPDATE_UNIT,
  UPDATE_SCORE,
  DELETE_DANGKYMON,
  UPDATE_PASSWORD,
  TEACHER_UPW,
  STUDENT_UPW,
  GET_SUBJECT_DEPARTMENT,
  GET_COURSE_BY_KEHOACHNAM,
  GET_THONGKE_BY_SOMETHING,
  GET_COURSE_BY_SOMETHING,
  GET_ALL_COURSE_BY_MKH,
  GET_ALL_COURSE_BY_UNIMKH,
  GET_COURSEDETAIL_COURSE,
  UPDATE_COURSEDETAIL,
  DELETE_COURSEDETAIL,
  GET_ALL_KHN,
} from "../actionTypes";
import * as api from "../api";
//getAll
export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllTeacher = (redata) => async (dispatch) => {
  try {
    const { data } = await api.getAllTeacher(redata);

    dispatch({ type: GET_ALL_TEACHER, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllUnit = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnit();
    dispatch({ type: GET_ALL_UNIT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllSubject = () => async (dispatch) => {
  try {
    const { data } = await api.getAllSubject();
    dispatch({ type: GET_ALL_SUBJECT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllStudent = () => async (dispatch) => {
  try {
    const { data } = await api.getAllStudent();
    dispatch({ type: GET_ALL_STUDENT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllCourse = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourse();
    dispatch({ type: GET_ALL_COURSE, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCourseDetail = () => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseDetail();
    dispatch({ type: GET_ALL_COURSE_DETAIL, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllKHN = () => async (dispatch) => {
  try {
    const { data } = await api.getAllKHN();
    dispatch({ type: GET_ALL_KHN, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
// Add
export const addDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addDepartment(formData);
    if (data.status === "success") {
      toast.success("Thêm khoa mới thành công!");
      dispatch({ type: ADD_DEPARTMENT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addTeacher(formData);
    if (data.status === "success") {
      toast.success("Thêm giảng viên mới thành công!");
      dispatch({ type: ADD_TEACHER, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUnit(formData);
    if (data.status === "success") {
      toast.success("Thêm lớp học mới thành công!");
      dispatch({ type: ADD_UNIT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addStudent(formData);
    if (data.status === "success") {
      toast.success("Thêm sinh viên mới thành công!");
      dispatch({ type: ADD_STUDENT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addSubject(formData);
    if (data.status === "success") {
      toast.success("Thêm môn học mới thành công!");
      dispatch({ type: ADD_SUBJECT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(formData);
    if (data.status === "success") {
      toast.success("Thêm lớp tín chỉ mới thành công!");
      dispatch({ type: ADD_COURSE, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const addCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCourseDetail(formData);
    if (data.status === "success") {
      toast.success("Thêm chi tiết lớp tín chỉ mới thành công!");
      dispatch({ type: ADD_COURSE_DETAIL, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

//update

export const updateDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateDepartment(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa Khoa thành công!");
      dispatch({ type: UPDATE_DEPARTMENT, payload: true });
    } else {
      toast.error("Chỉnh sửa khoa không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUnit(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa lớp học thành công!");
      dispatch({ type: UPDATE_UNIT, payload: true });
    } else {
      toast.error("Chỉnh sửa lớp học không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateSubject(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa môn học thành công!");
      dispatch({ type: UPDATE_SUBJECT, payload: true });
    } else {
      toast.error("Chỉnh sửa môn học không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateStudent(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa sinh viên thành công!");
      dispatch({ type: UPDATE_STUDENT, payload: true });
    } else {
      toast.error("Chỉnh sửa sinh viên không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateTeacher(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa giảng viên thành công!");
      dispatch({ type: UPDATE_TEACHER, payload: true });
    } else {
      toast.error("Chỉnh sửa giảng viên không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa lớp tín chỉ thành công!");
      dispatch({ type: UPDATE_COURSE, payload: true });
    } else {
      toast.error("Chỉnh sửa lớp tín chỉ không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCourseDetail(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa chi tiết lớp tín chỉ thành công!");
      dispatch({ type: UPDATE_COURSEDETAIL, payload: true });
    } else {
      toast.error("Chỉnh sửa chi tiết lớp tín chỉ không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateScore = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateScore(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa điểm thành công!");
      dispatch({ type: UPDATE_SCORE, payload: true });
    } else {
      toast.error("Chỉnh sửa điểm không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updatePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePassword(formData);

    if (data.status === "success") {
      toast.success("Đổi mật khẩu thành công!");
      dispatch({ type: UPDATE_PASSWORD, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành công!");
    }
  } catch (error) {
    console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const teacherUpw = (formData) => async (dispatch) => {
  try {
    const { data } = await api.teacherUpw(formData);

    if (data.status === "success") {
      toast.success("Đối mật khẩu thành công!");
      dispatch({ type: TEACHER_UPW, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành không!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const studentUpw = (formData) => async (dispatch) => {
  try {
    const { data } = await api.studentUpw(formData);

    if (data.status === "success") {
      toast.success("Đối mật khẩu thành công!");
      dispatch({ type: STUDENT_UPW, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành không!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
// delete
export const deleteDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDepartment(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa khoa thành công!");
      dispatch({ type: DELETE_DEPARTMENT, payload: true });
    } else {
      toast.error("Xóa Khoa này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa Khoa không Thành công" });
    }
  } catch (error) {
    // console.log("vô đây nè");
    dispatch({ type: SET_ERRORS, payload: "Xóa Khoa không Thành công" });
  }
};

export const deleteUnit = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteUnit(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa lớp học thành công!");
      dispatch({ type: DELETE_UNIT, payload: true });
    } else {
      toast.error("Xóa Lớp này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa lớp không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const deleteStudent = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteStudent(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa sinh viên thành công!");
      dispatch({ type: DELETE_STUDENT, payload: true });
    } else {
      toast.error("Xóa sinh viên này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không Thành công" });
  }
};
export const deleteTeacher = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteTeacher(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa giảng viên thành công!");
      dispatch({ type: DELETE_TEACHER, payload: true });
    } else {
      toast.error("Xóa giảng viên này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa giảng viên không thành công",
      });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa giảng viên không Thành công" });
  }
};
export const deleteCourse = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa lớp tín chỉ thành công!");
      dispatch({ type: DELETE_COURSE, payload: true });
    } else {
      toast.error("Xóa lớp tín chỉ này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa lớp tín chỉ không thành công",
      });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa lớp tín chỉ không Thành công" });
  }
};

export const deleteCourseDetail = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourseDetail(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa chi tiết lớp tín chỉ thành công!");
      dispatch({ type: DELETE_COURSEDETAIL, payload: true });
    } else {
      toast.error("Xóa chi tiết lớp tín chỉ này không thành không!");
      dispatch({
        type: SET_ERRORS,
        payload: "Xóa chi tiết lớp tín chỉ không thành công",
      });
    }
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: "Xóa chi tiết lớp tín chỉ không Thành công",
    });
  }
};
export const deleteSubject = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteSubject(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa môn học thành công!");
      dispatch({ type: DELETE_SUBJECT, payload: true });
    } else {
      toast.error("Xóa môn học này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa Môn học không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa Môn học không Thành công" });
  }
};
export const deleteDangkymon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDangkymon(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa điểm thành công!");
      dispatch({ type: DELETE_DANGKYMON, payload: true });
    } else {
      toast.error("Xóa điểm không thành công!");
      dispatch({ type: SET_ERRORS, payload: "Xóa điểm không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa điểm không Thành công" });
  }
};
// get...bysomething
export const getTeacherDepartment =
  (department, page, size) => async (dispatch) => {
    try {
      const { data } = await api.getTeacherDepartment(department, page, size);
      dispatch({ type: GET_TEACHER_DEPARTMENT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const getStudentUnit = (unit, page, size) => async (dispatch) => {
  try {
    const { data } = await api.getStudentUnit(unit, page, size);

    dispatch({ type: GET_STUDENT_UNIT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUnitDepartment = (department) => async (dispatch) => {
  try {
    const { data } = await api.getUnitDepartment(department);
    dispatch({ type: GET_UNIT_DEPARTMENT, payload: data });
  } catch (error) {
    // console.log("error.response.data", error.response.data);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getCourseUnit = (unit) => async (dispatch) => {
  try {
    const { data } = await api.getCourseUnit(unit);
    dispatch({ type: GET_COURSE_UNIT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getScoreCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.getScoreCourse(course);
    dispatch({ type: GET_SCORE_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getSubjectDepartment =
  (department, page, size) => async (dispatch) => {
    try {
      const { data } = await api.getSubjectDepartment(department, page, size);
      dispatch({ type: GET_SUBJECT_DEPARTMENT, payload: data });
    } catch (error) {
      // console.log("error.response.data", error.response.data);
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };
//
export const getAllCoursebyUnitMKH = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebyUnitMKH(requestData);

    dispatch({ type: GET_ALL_COURSE_BY_UNIMKH, payload: data });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllCourseDetailCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.getAllCourseDetailCourse(course);
    dispatch({ type: GET_COURSEDETAIL_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
// getbyid
export const getStudentById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getStudentById(id);
    dispatch({ type: GET_STUDENT_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getCoursebyKeHoachNam = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getCoursebyKeHoachNam(requestData);

    console.log("data", data);
    dispatch({ type: GET_COURSE_BY_KEHOACHNAM, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getThongkebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getThongkebysomething(requestData);

    dispatch({ type: GET_THONGKE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCoursebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebysomething(requestData);

    dispatch({ type: GET_COURSE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllCoursebyMKH = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebyMKH(requestData);

    dispatch({ type: GET_ALL_COURSE_BY_MKH, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
// export const clearThongkes = () => ({
//   type: "CLEAR_THONGKES",
// });
