import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  getAllDepartment,
  getTeacherById,
} from "../../../redux/actions/teacherActions";

const Profile = () => {
  const store = useSelector((state) => state);
  const idLogin = store.auth.teacherData.retObj.userDetails?.idLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeacherById(idLogin));
    dispatch(getAllDepartment(idLogin));
  }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Profile;
