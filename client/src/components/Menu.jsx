import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Menu({ currentUser, currentName, toNavigate }) {
  const { id1, id } = useParams();
  const location = useLocation();
  const [displayCourse, setDisplayCourse] = useState();
  const studentInfo = location.state?.studentInfo || null;

  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[2];

  const getCurrentComponent = () => {
    const component = location.pathname.split("/")[1];
    return component.charAt(0).toUpperCase() + component.slice(1);
  };
  return currentName ? (
    id1 ? (
      <>
        <div className="pl-24 pt-8 flex flex-row cursor-pointer">
          <div>
            <p className="text-xl ">
              <img
                className="h-10 w-10 "
                src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
              />{" "}
              <button
                className="hover:underline"
                onClick={() => navigate(toNavigate)}
              >
                {getCurrentComponent()}
              </button>
              {"   "}
              {">"}
              {"   "}
              <button
                className="hover:underline"
                onClick={() => navigate(`/courses/${courseId}`)}
              >
                {currentName}
              </button>
              {"   "}
              {">"}
              {"   "}
              {"Students"}
              {"   "}
              {">"}
              {"   "}
              {studentInfo.name}
            </p>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="pl-24 pt-8 flex flex-row cursor-pointer">
          <div>
            <p className="text-xl ">
              <img
                className="h-10 w-10 "
                src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
              />{" "}
              <button
                className="hover:underline"
                onClick={() => navigate(toNavigate)}
              >
                {getCurrentComponent()}
              </button>
              {"   "}
              {">"}
              {"   "}
              {currentName}
            </p>
          </div>
        </div>
      </>
    )
  ) : (
    <>
      <div className="pl-24 pt-8 flex flex-row cursor-pointer">
        <div>
          <p className="text-xl">
            <img
              className="h-10 w-10"
              src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
              // onClick={}
            />{" "}
            <button onClick={() => navigate(toNavigate)}>
              {getCurrentComponent()}
            </button>
            {"   "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Menu;
