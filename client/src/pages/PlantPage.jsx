import React from "react";
import PlantCard from "../components/PlantCard";
import NoAccess from "./NoAccess";
import SearchBar from "../components/SearchBar";
import Menu from "../components/Menu";

function PlantPage({
  plants,
  currentUser,
  isLoggedIn,
  isRightTrayVisible,
  setIsRightTrayVisible,
}) {
  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("currentUser:", currentUser);
  if (!isLoggedIn) {
    return (
      <NoAccess
        isRightTrayVisible={isRightTrayVisible}
        setIsRightTrayVisible={setIsRightTrayVisible}
      />
    );
  }
  return (
    <div>
      <Menu toNavigate={"/plants"} />
      <PlantCard plants={plants} currentUser={currentUser} />
    </div>
  );
}

export default PlantPage;
