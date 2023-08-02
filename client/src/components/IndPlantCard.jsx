import React from "react";

function IndPlantCard({ plant, currentUser }) {
  // Use the plant and currentUser data as needed to display the individual plant information
  return (
    <div className="font-ibarra">
      <h1>Individual Plant Card</h1>
      {/* Display the individual plant details */}
      <p>Latin name: {plant.latin}</p>
      <p>Image: {plant.img}</p>
      <p>Plant Family: {plant.family}</p>

      {/* If currentUser is available, you can render additional content */}
      {currentUser && <p>Welcome, {currentUser.name}!</p>}
    </div>
  );
}

export default IndPlantCard;
