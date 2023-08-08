import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/headerlogo.png";
import RightTray from "./RightTray";
import burger from "../assets/hamburger.png";
import xicon from "../assets/xicon.png";

function NavBar({
  currentUser,
  setIsLoggedIn,
  setCurrentUser,
  isLoggedIn,
  setIsRightTrayVisible,
  isRightTrayVisible,
}) {
  const navigate = useNavigate();

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleRightTrayClick = () => {
    setIsRightTrayVisible(!isRightTrayVisible);
  };

  const handleProfileButtonClick = () => {
    setIsRightTrayVisible(true);
  };

  const handleBurgerClick = () => {
    setIsBurgerOpen(!isBurgerOpen); // Toggle the burger icon state
  };

  return (
    <>
      <div>
        <div className="h-4 bg-lime-900 w-screen"></div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <button
              onClick={() => {
                handleBurgerClick();
              }}
              className="p-2 h-auto w-10 leading-4 focus:outline-none"
            >
              <img src={isBurgerOpen ? xicon : burger} alt="Burger" />
            </button>
            <a href="#">
              <img
                src={logo}
                className="pl-4 p-2 h-auto w-14 leading-4"
                alt="Logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4 hover:underline"
              onClick={() => {
                navigate("/blooms");
              }}
            >
              Blooms
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4 hover:underline"
              onClick={() => {
                navigate("/plants");
              }}
            >
              Plants
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4 hover:underline"
              onClick={() => {
                navigate("/buddies");
              }}
            >
              Buddies
            </a>
            <a
              href="#"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4 hover:underline"
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
                isLoggedIn={isLoggedIn}
              />
            )}
            {!isRightTrayVisible && (
              <button
                onClick={handleProfileButtonClick}
                className="p-4 text-2xl font-ibarra border-black border-2 rounded-full leading-4"
              >
                Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
