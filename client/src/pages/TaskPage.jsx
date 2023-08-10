import React from "react";
import NoAccess from "./NoAccess";
import UserTasks from "../components/UserTasks";

function TaskPage({
  isLoggedIn,
  isRightTrayVisible,
  setIsRightTrayVisible,
  currentUser,
}) {
  if (!isLoggedIn) {
    return (
      <NoAccess
        isRightTrayVisible={isRightTrayVisible}
        setIsRightTrayVisible={setIsRightTrayVisible}
      />
    );
  }

  return (
    <div className="">
      <div className="">
        <div className="">
          <UserTasks currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
