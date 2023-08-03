import React from "react";
import PlantCard from "../components/PlantCard";
import SearchBar from "../components/SearchBar";

import NoAccess from "../components/NoAccess";

function PlantPage({ plants, currentUser, isLoggedIn }) {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);
  return isLoggedIn ? (
    <div>
      <SearchBar />
      <PlantCard plants={plants} currentUser={currentUser} />
    </div>
  ) : (
    <NoAccess />
  );
}

export default PlantPage;
