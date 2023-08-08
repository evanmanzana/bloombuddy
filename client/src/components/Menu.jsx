import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Menu({ currentUser, currentPlant, toNavigate }) {
  const { id1, id } = useParams();
  const location = useLocation();
  const [displayPlant, setDisplayPlant] = useState();
  const studentInfo = location.state?.studentInfo || null;

  const navigate = useNavigate();
  const plantId = location.pathname.split("/")[2];

  const getCurrentComponent = () => {
    const component = location.pathname.split("/")[1];
    return component.charAt(0).toUpperCase() + component.slice(1);
  };
  return (
    <>
      <div className="pl-24 pt-8 grid grid-cols-2 cursor-pointer font-ibarra">
        <div className="">
          <p className="text-xl grid grid-cols-2 gap-0">
            <button
              className="text-left hover:underline"
              onClick={() => navigate(toNavigate)}
            >
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
