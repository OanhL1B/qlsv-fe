import React from "react";
import { useSelector } from "react-redux";

const Body = () => {
  const teachers = useSelector((state) => state.teacher.teachers?.retObj);
  const departments = useSelector((state) => state.teacher.allDepartment);
  const DepartmentObj = departments?.find(
    (dp) => dp.maKhoa === teachers?.maKhoa
  );

  return (
    <div className="flex-[0.9] mt-10 mx-10 item-center">
      <h1 className="mb-3 text-lg text-text2 ">Thông tin khoa trực thuộc</h1>
      <table className="w-full table-auto">
        <thead className="bg-[#E1EEEE] items-center justify-center">
          <tr>
            <th className="px-4 py-2">Mã Khoa</th>
            <th className="px-4 py-2">Tên Khoa</th>
            <th className="px-4 py-2">SĐT</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>

        <tbody className="items-center justify-center">
          <tr className="justify-center item-center hover:bg-[#EEF5F5]">
            <td className="px-4 py-2 text-center border">
              {DepartmentObj?.maKhoa}
            </td>
            <td className="px-4 py-2 text-center border">
              {DepartmentObj?.tenKhoa}
            </td>
            <td className="px-4 py-2 text-center border">
              {DepartmentObj?.sdt}
            </td>
            <td className="px-4 py-2 text-center border">
              {DepartmentObj?.email}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Body;
