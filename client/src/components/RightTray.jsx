import React from "react";
import { useNavigate } from "react-router-dom";

function RightTray({
  currentUser,
  setIsLoggedIn,
  setCurrentUser,
  handleRightTrayClick,
}) {
  const navigate = useNavigate();

  function handleLogOut(e) {
    fetch("/api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
  }

  return (
    <div className="flex flex-col fixed right-2 items-center w-60 pt-8 h-2/3 border-2 border-black">
      <div
        onClick={() => {
          handleRightTrayClick();
        }}
      >
        X
      </div>
      <div className="text-xl border-b-2 border-black">{currentUser.name}</div>

      <div
        className="cursor-pointer"
        onClick={() => {
          navigate("/account/settings");
          handleRightTrayClick();
        }}
      >
        Settings
      </div>
      <button
        onClick={handleLogOut}
        className="border-slate-300 rounded border-2 mt-4 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default RightTray;
