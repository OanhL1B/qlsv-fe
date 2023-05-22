import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-primary">
      <div className="max-w-[1000px] mx-auto my-0 items-center">
        <img
          src="/404.png"
          alt="notfound"
          className="max-w-[250px] mt-0 mx-auto mb-[40px]"
        />
        <h1 className="mb-5 text-6xl font-bold">
          404 - Looks like you're lost.
        </h1>
        <p className="max-w-[800px] mx-auto mt-0 mb-[40px]">
          Maybe this page used to exist or you just spelled something wrong.
          Chances are your spelled something wrong, so can you double check the
          URL?
        </p>
        <div className="items-center justify-center w-full mx-auto">
          <button
            onClick={() => navigate("/")}
            className="items-center px-4 py-8 mx-auto font-medium text-white rounded-lg text- bg-gradient-to-r from-primary to-green-300"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
