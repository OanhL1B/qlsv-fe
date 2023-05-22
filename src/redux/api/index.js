import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9090/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});
const APIV2 = axios.create({ baseURL: "http://localhost:9090/" });

APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("teacherUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("teacherUser")).retObj.jwt
    }`;
  }
  return req;
});
const APIV3 = axios.create({ baseURL: "http://localhost:9090/" });

APIV3.interceptors.request.use((req) => {
  if (localStorage.getItem("studentUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("studentUser")).retObj.jwt
    }`;
  }
  return req;
});

export const userLogin = (formData) => API.post("/api/auth/signin", formData);
// 1. Khoa
export const getAllDepartment = () => API.get("/api/admin/khoa");
export const addDepartment = (department) =>
  API.post("/api/admin/khoa", department);
export const updateDepartment = (updateDepartment) =>
  API.put("/api/admin/khoa", updateDepartment);

export const deleteDepartment = (data) =>
  API.delete("api/admin/khoa", { data });

//2. teacher

export const getTeacherDepartment = (department, page, size) =>
  API.get(`/api/admin/giangVien/khoa/${department}?page=${page}&size=${size}`);

export const getAllTeacher = (data) => API.get("/api/admin/giangVien", data);
export const addTeacher = (teacher) =>
  API.post("/api/admin/giangVien", teacher);
export const updateTeacher = (updateTeacher) =>
  API.put("/api/admin/giangVien", updateTeacher);
export const getTeacherById = (id) => API.get(`/api/admin/giangVien/${id}`, id);
export const deleteTeacher = (data) =>
  API.delete("api/admin/giangVien", { data });

//Lớp

export const addUnit = (unit) => API.post("/api/admin/lop", unit);
export const getAllUnit = () => API.get("/api/admin/lop");

export const getUnitDepartment = (department) =>
  API.get(`/api/admin/lop/khoa/${department}`, department);
export const updateUnit = (updateUnit) => API.put("/api/admin/lop", updateUnit);
export const deleteUnit = (data) => API.delete("api/admin/lop", { data });

// môn học
export const getAllSubject = () => API.get("/api/admin/monHoc");
export const addSubject = (subject) => API.post("/api/admin/monHoc", subject);
export const updateSubject = (updateSubject) =>
  API.put("/api/admin/monHoc", updateSubject);
export const deleteSubject = (data) => API.delete("api/admin/monHoc", { data });

export const getSubjectDepartment = (department, page, size) =>
  API.get(`/api/admin/monHoc/khoa/${department}?page=${page}&size=${size}`);

//sinh viên
export const getAllStudent = () => API.get("/api/admin/sinhVien");
export const addStudent = (student) => API.post("/api/admin/sinhVien", student);
export const getStudentUnit = (unit, page, size) =>
  API.get(`/api/admin/sinhVien/lop/${unit}?page=${page}&size=${size}`);

export const updateStudent = (updateStudent) =>
  API.put("/api/admin/sinhVien", updateStudent);
export const getStudentById = (id) => API.get(`/api/admin/sinhVien/${id}`, id);
export const deleteStudent = (data) =>
  API.delete("api/admin/sinhVien", { data });

//lớp tín chỉ
export const addCourse = (course) => API.post("/api/admin/dsLopTc", course);
export const getCourseUnit = (unit) =>
  API.get(`/api/admin/dsLopTc/lop/${unit}`, unit);
export const getAllCourse = () => API.get("/api/admin/dsLopTc");
export const updateCourse = (updateCourse) =>
  API.put("/api/admin/dsLopTc", updateCourse);
export const deleteCourse = (data) => API.delete("api/admin/dsLopTc", { data });
//*new
export const getAllCoursebysomething = (data) =>
  API.get("api/admin/dsLopTc", data);
// phục vụ thằng điểm
export const getAllCoursebyMKH = (data) => API.get("api/admin/dsLopTc", data);

export const getAllCoursebyUnitMKH = (data) =>
  API.get("api/admin/dsLopTc", data);

//Điểm
export const getScoreCourse = (course) =>
  API.get(`/api/admin/diem/lopTc/detail/${course}`, course);
export const updateScore = (updateScore) =>
  API.put("/api/admin/diem", updateScore);

// chi tiết lớp tín chỉ
export const addCourseDetail = (coursedetail) =>
  API.post("/api/admin/chiTietLopTc", coursedetail);
export const getAllCourseDetail = () => API.get("/api/admin/chiTietLopTc");
export const updateCourseDetail = (updateCourseDetail) =>
  API.put("/api/admin/chiTietLopTc", updateCourseDetail);
export const deleteCourseDetail = (data) =>
  API.delete("api/admin/chiTietLopTc", { data });

export const getAllCourseDetailCourse = (course) =>
  API.get(`api/admin/chiTietLopTc/lopTc/${course}`, course);
// đăng ký môn
export const deleteDangkymon = (data) =>
  API.delete("api/admin/dang-ky-mon", { data });

// đổi mật khẩu
export const updatePassword = (updatePassword) =>
  API.put("/api/admin/updatePassword", updatePassword);

export const studentUpw = (updatePassword) =>
  APIV3.put("/api/admin/updatePassword", updatePassword);

export const teacherUpw = (updatePassword) =>
  APIV2.put("/api/admin/updatePassword", updatePassword);
// thống kê
export const getCoursebyKeHoachNam = (data) =>
  API.get("api/admin/search/thong-ke", data);
export const getThongkebysomething = (data) =>
  API.get("api/admin/diem/thong-ke", data);
// kế hoạch năm
export const getAllKHN = () => API.get("/api/admin/keHoachNam");
