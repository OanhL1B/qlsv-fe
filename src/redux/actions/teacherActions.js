import { toast } from "react-toastify";
import {
  GET_ALL_DEPARTMENT,
  GET_ALL_KHN,
  GET_COURSE_TEACHER_KHM,
  GET_SCORE_COURSE,
  GET_TEACHER_BY_ID,
  GET_THONGKE_BY_SOMETHING,
  GET_TKB_TEACHER,
  SET_ERRORS,
  UPDATE_SCORE,
} from "../actionTypes";
import * as api from "../api/apiTeacher";

export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getTeacherById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTeacherById(id);
    dispatch({ type: GET_TEACHER_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
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

export const getAllKHN = () => async (dispatch) => {
  try {
    const { data } = await api.getAllKHN();
    dispatch({ type: GET_ALL_KHN, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getCourseTeacherKHM = (maGv, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getCourseTeacherKHM(maGv, maKeHoach);
    dispatch({ type: GET_COURSE_TEACHER_KHM, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllTKBTeacher = (maSv, tuan, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getAllTKBTeacher(maSv, tuan, maKeHoach);
    dispatch({ type: GET_TKB_TEACHER, payload: data });
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

export const getThongkebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getThongkebysomething(requestData);

    dispatch({ type: GET_THONGKE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
