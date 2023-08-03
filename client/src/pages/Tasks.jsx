import React from "react";
import NoAccess from "../components/NoAccess";

function Tasks({ isLoggedIn }) {
  return isLoggedIn ? (
    <div className="flex justify-center items-center h-screen font-ibarra">
      <div className="text-center">
        <h2 className="text-4xl ">This will be a Tasks Page</h2>
      </div>
    </div>
  ) : (
    <NoAccess />
  );
}

export default Tasks;
