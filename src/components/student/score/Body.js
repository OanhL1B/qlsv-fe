import { getScoreStudent } from "../../../redux/actions/studentActions";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";

// http://localhost:9090/api/admin/diem/N19DCCN085?maKeHoach=MKH1

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("studentUser"));
  const khns = useSelector((state) => state.admin.allKHN);

  const [valueMKH, setValueMKH] = useState({ maKeHoach: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});

    dispatch(
      getScoreStudent(user?.retObj?.userDetails?.username, valueMKH?.maKeHoach)
    );
  };

  const scores = useSelector((state) => state?.student?.scores?.retObj);

  useEffect(() => {
    if (scores?.length !== 0 || scores?.length === 0) {
      setLoading(false);
    }
  }, [scores]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex flex-col mt-1">
        <div className="items-center rounded-lg">
          <form
            className="flex flex-col col-span-1 space-y-2"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-x-2">
              <div className="flex flex-col">
                <span className="mb-1 text-text2">Chọn học kỳ xem điểm:</span>

                <Select
                  displayEmpty
                  sx={{ height: 36, width: 274 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={valueMKH.maKeHoach}
                  onChange={(e) =>
                    setValueMKH({ ...valueMKH, maKeHoach: e.target.value })
                  }
                  className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px] mr-3"
                >
                  <MenuItem value="">None</MenuItem>
                  {khns?.map((khn, idx) => (
                    <MenuItem key={idx} value={khn.maKeHoach}>
                      {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <button
                className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
                type="submit"
              >
                Lọc
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="w-full">
            <div className="col-span-3">
              <div className={classes.loadingAndError}>
                {loading && scores?.length !== 0 && (
                  <Spinner
                    message="Loading"
                    height={50}
                    width={150}
                    color="#157572"
                    messageColor="#157572"
                  />
                )}
                {scores?.length === 0 && (
                  <p className="text-2xl font-bold text-red-500">
                    Hiện tại điểm chưa được cập nhật
                  </p>
                )}
              </div>

              {search &&
                !loading &&
                Object.keys(error).length === 0 &&
                scores?.length !== 0 && (
                  <div>
                    <table className="w-full table-auto">
                      <thead className="bg-[#E1EEEE] items-center">
                        <tr>
                          <th className="px-4 py-2">STT</th>
                          <th className="px-4 py-2">Tên môn</th>
                          <th className="px-4 py-2">TC</th>
                          <th className="px-4 py-2">%CC</th>
                          <th className="px-4 py-2">%GK</th>
                          <th className="px-4 py-2">%CK</th>
                          <th className="px-4 py-2">Điểm CC</th>
                          <th className="px-4 py-2">Điểm GK</th>
                          <th className="px-4 py-2">Điểm CK</th>
                          <th className="px-4 py-2">TK10</th>
                          <th className="px-4 py-2">TKCH</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {scores?.map((score, idx) => (
                          <tr
                            className="justify-center item-center hover:bg-[#EEF5F5]"
                            key={idx}
                          >
                            <td className="px-4 py-2 border">{idx + 1}</td>
                            <td className="px-4 py-2 border">{score.tenMh}</td>
                            <td className="px-4 py-2 border">{score.soTc}</td>
                            <td className="px-4 py-2 border">
                              {score.percentCc}
                            </td>
                            <td className="px-4 py-2 border">
                              {score.percentGk}
                            </td>
                            <td className="px-4 py-2 border">
                              {score.percentCk}
                            </td>
                            <td className="px-4 py-2 border">{score.cc}</td>
                            <td className="px-4 py-2 border">{score.gk}</td>
                            <td className="px-4 py-2 border">{score.ck}</td>
                            <td className="px-4 py-2 border">{score.tb}</td>
                            <td className="px-4 py-2 border">
                              {score.xepLoai}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
