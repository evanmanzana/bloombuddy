import React from "react";
import { useNavigate } from "react-router-dom";

function LeftTray({
  currentUser,
  setIsLoggedIn,
  setCurrentUser,
  handleLeftTrayClick,
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
    <div className="flex flex-col fixed left-20 items-center w-60 pt-8 h-2/3 bg-zinc-600 text-neutral-300 m-0 border-2 border-neutral-300">
      <div className="text-xl border-b-2 border-black">{currentUser.name}</div>

      <div
        className="cursor-pointer"
        onClick={() => {
          handleLeftTrayClick();
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

export default LeftTray;
