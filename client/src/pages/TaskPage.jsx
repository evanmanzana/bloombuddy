import React from "react";
import NoAccess from "./NoAccess";

function TaskPage({ isLoggedIn, isRightTrayVisible, setIsRightTrayVisible }) {
  if (!isLoggedIn) {
    return (
      <NoAccess
        isRightTrayVisible={isRightTrayVisible}
        setIsRightTrayVisible={setIsRightTrayVisible}
      />
    );
  }

  return (
    <div className="flex justify-center items-center h-screen font-ibarra">
      <div className="text-center">
        <h2 className="text-4xl ">This will be a TaskPage Page</h2>
      </div>
    </div>
  );
}

export default TaskPage;
