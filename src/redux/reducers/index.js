import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import teacherReducer from "./teacherReducer";
import studentReducer from "./studentReducer";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
  teacher: teacherReducer,
  student: studentReducer,
  auth: authReducer,
});
