import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/headerlogo.png";
// import { useNavigate } from "react-router-dom";
import LeftTray from "./LeftTray";
import burger from "../assets/hamburger.png";

function NavBar({ currentUser, setIsLoggedIn, setCurrentUser }) {
  // const navigate = useNavigate();
  const [isLeftTrayVisible, setIsLeftTrayVisible] = useState(false);

  const handleLeftTrayClick = () => {
    setIsLeftTrayVisible(!isLeftTrayVisible);
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <a href="">
              <img
                src={burger}
                className="p-2 h-auto w-10 leading-4"
                alt="Logo"
              />
            </a>
            <a href="/">
              <img
                src={logo}
                className="p-2 h-auto w-14 leading-4"
                alt="Logo"
              />
            </a>
            <a
              href="/collection"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
            >
              Collection
            </a>
            <a
              href="/plants"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
            >
              Plants
            </a>
            <a
              href="/tasks"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
            >
              Tasks
            </a>
            <a
              href="/blog"
              className="ml-2 p-4 pt-4 text-2xl font-ibarra leading-4"
            >
              Blog
            </a>
          </div>
          <div className="">
            {isLeftTrayVisible && (
              <LeftTray
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                handleLeftTrayClick={handleLeftTrayClick}
              />
            )}
            <Link to="/profile">
              <button
                onClick={handleLeftTrayClick}
                className="p-4 text-2xl font-ibarra border-black border-2 rounded-full leading-4"
              >
                Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
