import React from "react";
import PlantCard from "../components/PlantCard";
import SearchBar from "../components/SearchBar";

function PlantPage({ plants, currentUser }) {
  return (
    <div>
      <SearchBar />
      <PlantCard plants={plants} currentUser={currentUser} />
    </div>
  );
}

export default PlantPage;
