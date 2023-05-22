import axios from "axios";

const APIV3 = axios.create({ baseURL: "http://localhost:9090/" });

APIV3.interceptors.request.use((req) => {
  if (localStorage.getItem("studentUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("studentUser")).retObj.jwt
    }`;
  }
  return req;
});

export const getAllUnit = () => APIV3.get("/api/admin/lop");
export const dangKymon = (data) => APIV3.post("api/admin/dang-ky-mon", data);
// lớp and mã kế hoạch
export const getAllCoursebysomething = (data) =>
  APIV3.get("api/admin/dsLopTc", data);

export const getStudentById = (id) =>
  APIV3.get(`/api/admin/sinhVien/${id}`, id);

export const getScoreStudent = (maSv, maKeHoach) =>
  APIV3.post(`api/admin/diem/${maSv}?maKeHoach=${maKeHoach}`);
export const getAllDsLtcSinhVien = (maSv) =>
  APIV3.get(`/api/admin/dsLopTc/sinhVien?maSv=${maSv}`, maSv);
export const deleteDkm = (data) =>
  APIV3.delete("api/admin/dang-ky-mon", { data });

export const getAllTKBStudent = (maSv, tuan, maKeHoach) =>
  APIV3.get(
    `/api/admin/tkb/sinhVien/${maSv}?tuan=${tuan}&maKeHoach=${maKeHoach}`
  );
export const getAllKHN = () => APIV3.get("/api/admin/keHoachNam");
