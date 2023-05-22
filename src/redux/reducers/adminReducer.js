import {
  ADD_COURSE,
  ADD_COURSE_DETAIL,
  ADD_DEPARTMENT,
  ADD_STUDENT,
  ADD_SUBJECT,
  ADD_TEACHER,
  ADD_UNIT,
  DELETE_COURSE,
  DELETE_DANGKYMON,
  DELETE_DEPARTMENT,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  DELETE_TEACHER,
  DELETE_UNIT,
  GET_ALL_COURSE,
  GET_ALL_COURSE_DETAIL,
  GET_ALL_DEPARTMENT,
  GET_ALL_STUDENT,
  GET_ALL_SUBJECT,
  GET_ALL_TEACHER,
  GET_ALL_TKB,
  GET_ALL_UNIT,
  GET_COURSE_UNIT,
  GET_SCORE_COURSE,
  GET_STUDENT_BY_ID,
  GET_STUDENT_UNIT,
  GET_TEACHER_DEPARTMENT,
  GET_UNIT_DEPARTMENT,
  ADMIN_LOGOUT,
  UPDATE_COURSE,
  UPDATE_DEPARTMENT,
  UPDATE_SCORE,
  UPDATE_STUDENT,
  UPDATE_SUBJECT,
  UPDATE_TEACHER,
  UPDATE_UNIT,
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
  CLEAR_THONGKES,
  RESET_STUDENTS,
  RESET_TEACHERS,
  RESET_SUBJECTS,
  RESET_COURSEDETAILS,
  GET_ALL_KHN,
  RESET_COURSES,
  RESET_SCORES,
  RESET_UNITS,
} from "../actionTypes";

const initialState = {
  authData: null,

  // edit
  updatedDepartment: false,
  updatedUnit: false,
  updatedSubject: false,
  updatedStudent: false,
  updatedTeacher: false,
  updatedCourse: false,
  updateScore: false,
  updatePassworded: false,
  updatedCourseDetail: false,
  teacherupwed: false,
  studentupwed: false,

  // add
  departmentAdded: false,
  teacherAdded: false,
  studentAdded: false,
  subjectAdded: false,
  coursedetailAdded: false,
  //getll
  allTeacher: [],
  allSubject: [],
  allStudent: [],
  allDepartment: [],
  allCourseDetail: [],
  allTKB: [],
  allKHN: [],
  //getbyidby~
  students: [],
  teachers: [],
  subjects: [],
  admins: [],
  units: [],
  courses: [],
  scores: [],
  thongkes: [],
  coursedetails: [],

  //delete
  departmentDeleted: false,
  unitDeleted: false,
  teacherDeleted: false,
  studentDeleted: false,
  subjectDeleted: false,
  courseDeleted: false,
  dangkymonDeleted: false,
  coursedetailDeleted: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    //   localStorage.setItem("user", JSON.stringify({ ...action?.data }));
    //   return { ...state, authData: action?.data };
    case ADMIN_LOGOUT:
      // localStorage.clear();
      localStorage.removeItem("adminUser");
      return { ...state, authData: action?.data };

    case GET_ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: action.payload,
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departmentAdded: action.payload,
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departmentDeleted: action.payload,
      };
    case GET_TEACHER_DEPARTMENT:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_ALL_TEACHER:
      return {
        ...state,
        allTeacher: action.payload,
      };
    case ADD_TEACHER:
      return {
        ...state,
        teacherAdded: action.payload,
      };

    case ADD_UNIT:
      return {
        ...state,
        united: action.payload,
      };
    case GET_ALL_UNIT:
      return {
        ...state,
        allUnit: action.payload,
      };
    case GET_STUDENT_UNIT:
      return {
        ...state,
        students: action.payload,
      };

    case GET_ALL_SUBJECT:
      return {
        ...state,
        allSubject: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        studentAdded: action.payload,
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjectAdded: action.payload,
      };
    case ADD_COURSE:
      return {
        ...state,
        courseAdded: action.payload,
      };
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        updatedDepartment: action.payload,
      };
    case GET_UNIT_DEPARTMENT:
      return {
        ...state,
        units: action.payload,
      };
    case GET_ALL_STUDENT:
      return {
        ...state,
        allStudent: action.payload,
      };
    case GET_COURSE_UNIT:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_SCORE_COURSE:
      return {
        ...state,
        scores: action.payload,
      };
    case GET_ALL_COURSE:
      return {
        ...state,
        allCourse: action.payload,
      };
    case UPDATE_UNIT:
      return {
        ...state,
        updatedUnit: action.payload,
      };
    case UPDATE_SUBJECT:
      return {
        ...state,
        updatedSubject: action.payload,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        updatedStudent: action.payload,
      };

    case GET_STUDENT_BY_ID:
      return {
        ...state,
        students: action.payload,
      };
    case UPDATE_TEACHER:
      return {
        ...state,
        updatedTeacher: action.payload,
      };
    case GET_ALL_TKB:
      return {
        ...state,
        allTKB: action.payload,
      };
    case ADD_COURSE_DETAIL:
      return {
        ...state,
        coursedetailAdded: action.payload,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        updatedCourse: action.payload,
      };
    case GET_ALL_COURSE_DETAIL:
      return {
        ...state,
        allCourseDetail: action.payload,
      };

    case DELETE_UNIT:
      return {
        ...state,
        unitDeleted: action.payload,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        studentDeleted: action.payload,
      };
    case DELETE_TEACHER:
      return {
        ...state,
        teacherDeleted: action.payload,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courseDeleted: action.payload,
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjectDeleted: action.payload,
      };
    case DELETE_DANGKYMON:
      return {
        ...state,
        dangkymonDeleted: action.payload,
      };

    case UPDATE_SCORE:
      return {
        ...state,
        updateScore: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatePassworded: action.payload,
      };
    case TEACHER_UPW:
      return {
        ...state,
        teacherupwed: action.payload,
      };
    case STUDENT_UPW:
      return {
        ...state,
        studentupwed: action.payload,
      };
    case GET_SUBJECT_DEPARTMENT:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_COURSE_BY_KEHOACHNAM:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_THONGKE_BY_SOMETHING:
      return {
        ...state,
        thongkes: action.payload,
      };
    //  mã lớp với mã kế hoạch á
    case GET_COURSE_BY_SOMETHING:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_ALL_COURSE_BY_MKH:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_ALL_COURSE_BY_UNIMKH:
      return {
        ...state,
        courses: action.payload,
      };
    case GET_COURSEDETAIL_COURSE:
      return {
        ...state,
        coursedetails: action.payload,
      };
    case UPDATE_COURSEDETAIL:
      return {
        ...state,
        updatedCourseDetail: action.payload,
      };
    case DELETE_COURSEDETAIL:
      return {
        ...state,
        coursedetailDeleted: action.payload,
      };
    case CLEAR_THONGKES:
      return {
        ...state,
        thongkes: [],
      };
    case RESET_STUDENTS:
      return {
        ...state,
        students: [],
      };
    case RESET_TEACHERS:
      return {
        ...state,
        teachers: [],
      };
    case RESET_SUBJECTS:
      return {
        ...state,
        subjects: [],
      };
    case RESET_COURSEDETAILS:
      return {
        ...state,
        coursedetails: [],
      };
    case RESET_SCORES:
      return {
        ...state,
        scores: [],
      };

    case GET_ALL_KHN:
      return {
        ...state,
        allKHN: action.payload,
      };
    case RESET_COURSES:
      return {
        ...state,
        courses: [],
      };
    case RESET_UNITS:
      return {
        ...state,
        units: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
