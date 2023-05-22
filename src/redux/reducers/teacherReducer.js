import {
  CLEAR_THONGKES,
  GET_ALL_DEPARTMENT,
  GET_ALL_KHN,
  GET_COURSE_TEACHER_KHM,
  GET_SCORE_COURSE,
  GET_TEACHER_BY_ID,
  GET_THONGKE_BY_SOMETHING,
  GET_TKB_TEACHER,
  RESET_COURSE_GV_MKH,
  RESET_SCORES,
  RESET_TKBS_TEACHER,
  TEACHER_LOGOUT,
  UPDATE_SCORE,
} from "../actionTypes";

const initialState = {
  teachers: [],
  tkb: [],
  authData: null,
  allDepartment: [],
  coursesbykhnmagv: [],
  scores: [],
  teachertkbs: [],
  khns: [],
  updateScore: false,
  thongkes: [],
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER_LOGOUT:
      localStorage.removeItem("teacherUser");
      return { ...state, authData: action?.data };
    case GET_ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: action.payload,
      };

    case GET_TEACHER_BY_ID:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_COURSE_TEACHER_KHM:
      return {
        ...state,
        coursesbykhnmagv: action.payload,
      };
    case RESET_COURSE_GV_MKH:
      return {
        ...state,
        coursesbykhnmagv: [],
      };
    case GET_SCORE_COURSE:
      return {
        ...state,
        scores: action.payload,
      };
    case RESET_SCORES:
      return {
        ...state,
        scores: [],
      };
    case GET_TKB_TEACHER:
      return {
        ...state,
        teachertkbs: action.payload,
      };
    case RESET_TKBS_TEACHER:
      return {
        ...state,
        teachertkbs: [],
      };
    case GET_ALL_KHN:
      return {
        ...state,
        khns: action.payload,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        updateScore: action.payload,
      };
    case GET_THONGKE_BY_SOMETHING:
      return {
        ...state,
        thongkes: action.payload,
      };
    case CLEAR_THONGKES:
      return {
        ...state,
        thongkes: [],
      };
    default:
      return state;
  }
};

export default teacherReducer;
