import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Spinner from "../../utils/Spinner";
import React, { useEffect, useState } from "react";
import { userLogin } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PTIT from "./ptit.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin({ username: username, password: password }, navigate));
  };
  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  return (
    <div className="relative w-full h-screen p-10 bg-lite isolate">
      <img src={PTIT} alt="bg" className=" w-[74px] h-[74px]" />

      <div className="flex items-center justify-center bg-lite">
        <div>
          <form
            onSubmit={login}
            className="flex flex-col items-center justify-center space-y-6 duration-1000 bg-white shadow-2xl h-96 w-96 rounded-3xl"
          >
            <h1 className="mt-2 text-3xl font-semibold text-text2">
              Đăng Nhập
            </h1>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>

              <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="relative block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your password"
                />
                <div className="absolute ml-[224px] mt-2">
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-32 py-1 mb-2 text-base text-white duration-150 rounded-lg hover:scale-105 bg-primary "
            >
              Login
            </button>
            {loading && (
              <Spinner
                message="Logging In"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#fff"
              />
            )}
            {error.message ? (
              <p className="text-red-500">{error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
