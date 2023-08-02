import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/headerlogo.png";
// import { useNavigate } from "react-router-dom";
import RightTray from "./RightTray";
import burger from "../assets/hamburger.png";

function NavBar({ currentUser, setIsLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const [isRightTrayVisible, setIsRightTrayVisible] = useState(false);

  const handleRightTrayClick = () => {
    setIsRightTrayVisible(!isRightTrayVisible);
  };
  return (
    <>
      <div>
        <div className="h-4 bg-black"></div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <a href="">
              <img
                src={burger}
                className="p-2 h-auto w-10 leading-4"
                alt="Logo"
              />
            </a>
            <a href="#">
              <img
                src={logo}
                className="p-2 h-auto w-14 leading-4"
                alt="Logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
              onClick={() => {
                navigate("/collection");
              }}
            >
              Collection
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
              onClick={() => {
                navigate("/plants");
              }}
            >
              Plants
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
              onClick={() => {
                navigate("/tasks");
              }}
            >
              Tasks
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
              onClick={() => {
                navigate("/blog");
              }}
            >
              Blog
            </a>
          </div>
          <div className="">
            {isRightTrayVisible && (
              <RightTray
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                handleRightTrayClick={handleRightTrayClick}
              />
            )}
            <button
              onClick={handleRightTrayClick}
              className="p-4 text-2xl font-ibarra border-black border-2 rounded-full leading-4"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
