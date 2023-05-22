import "./index.css";
import { Routes, Route } from "react-router-dom";
import AddCourse from "./components/admin/addCourse/AddCourse";
import AddCourseDetail from "./components/admin/addCourseDetail/AddCourseDetail";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AddStudent from "./components/admin/addStudent/AddStudent";
import AddSubject from "./components/admin/addSubject/AddSubject";
import AddTeacher from "./components/admin/addTeacher/AddTeacher";
import AddUnit from "./components/admin/addUnit/AddUnit";
import AdminHome from "./components/admin/AdminHome";
import CourseThongKe from "./components/admin/coursethongke/CourseThongKe";
import DangKyMon from "./components/student/dangkymon/DangKyMon";
import GetAllCourseDetail from "./components/admin/getAllCourseDetail/GetAllCourseDetail";
import GetCourseList from "./components/admin/getCoursebyUnit/GetCourseList";
import GetDepartmentList from "./components/admin/getDepartmentAll/GetDepartmentList";
import GetDepartmentTeacher from "./components/teacher/getDepartmentTeacher/GetDepartmentTeacher";
import GetScoreList from "./components/admin/getScoreCourse/GetScoreList";
import GetStudentList from "./components/admin/getStudentbyclass/GetStudentList";
import GetSubjectList from "./components/admin/getSubjectbyDepartment/GetSubjectList";
import GetTeacherList from "./components/admin/getTeacherbyDepartment/GetTeacherList";
import GetTKB from "./components/teacher/tkb/GetTKB";
import GetUnitList from "./components/admin/getUnitbyDepartment/GetUnitList";
import Login from "./components/login/Login";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import Profile from "./components/teacher/profile/Profile";
import React from "react";
import Score from "./components/student/score/Score";
import ScoreTeacher from "./components/teacher/scoreTeacher/ScoreTeacher";
import StudentHome from "./components/student/StudentHome";
import StudentInFo from "./components/student/studentInfo/StudentInFo";
import StudentUpw from "./components/student/updatepassword/StudentUpw";
import TeacherHome from "./components/teacher/TeacherHome";
import TeacherThongke from "./components/teacher/thongke/TeacherThongke";
import TeacherUpw from "./components/teacher/updatepassword/TeacherUpw";
import ThoiKhoaBieu from "./components/student/tkb/ThoiKhoaBieu";
import ThongKe from "./components/admin/thongke/ThongKe";
import UpdatePassWord from "./components/admin/updatepassword/UpdatePassWord";

const App = () => {
  return (
    <Routes>
      {/* admin */}
      {<Route exact path="/" element={<Login />} />}
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/getdepartmentall" element={<GetDepartmentList />} />
      <Route path="/admin/adddepartment" element={<AddDepartment />} />
      <Route path="/admin/teacher" element={<GetTeacherList />} />
      <Route path="/admin/addteacher" element={<AddTeacher />} />
      <Route path="/admin/allUnit" element={<GetUnitList />} />
      <Route path="/admin/addunit" element={<AddUnit />} />
      <Route path="/admin/student" element={<GetStudentList />} />
      <Route path="/admin/addstudent" element={<AddStudent />} />
      <Route path="/admin/allsubject" element={<GetSubjectList />} />

      <Route path="/admin/adddsubject" element={<AddSubject />} />
      <Route path="/admin/allcourse" element={<GetCourseList />} />
      <Route path="/admin/addcourse" element={<AddCourse />} />
      <Route path="/admin/allscore" element={<GetScoreList />} />
      <Route path="/admin/addcoursedetail" element={<AddCourseDetail />} />
      <Route path="/admin/coursedetail" element={<GetAllCourseDetail />} />

      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

      {/* Teacher */}
      <Route path="/admin/teacherHome" element={<TeacherHome />} />
      <Route path="/teacher/profile" element={<Profile />} />
      <Route path="/teacher/tkb" element={<GetTKB />} />
      <Route
        path="/teacher/getdepartmentall"
        element={<GetDepartmentTeacher />}
      />
      <Route path="teacher/score" element={<ScoreTeacher />} />
      <Route path="/teacher/updatepassword" element={<TeacherUpw />} />
      <Route path="/teacher/thongke" element={<TeacherThongke />} />
      {/* student */}
      <Route path="/admin/studentHome" element={<StudentHome />} />
      <Route path="/student/dangkymon" element={<DangKyMon />} />
      <Route path="/student/studentinfo" element={<StudentInFo />} />
      <Route path="student/updatepassword" element={<StudentUpw />} />
      <Route path="student/score" element={<Score />} />
      <Route path="/student/tkb" element={<ThoiKhoaBieu />} />

      {/* thống kê */}
      <Route path="/admin/thongke" element={<ThongKe />} />
      <Route path="admin/updatepassword" element={<UpdatePassWord />} />
      <Route path="/admin/thongkedetail/:maLopTc" element={<CourseThongKe />} />
    </Routes>
  );
};

export default App;
