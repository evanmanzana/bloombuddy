import React from "react";

function IndPlantCard({ plant, currentUser }) {
  const handleAddToCollection = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Set the Content-Type header to JSON
      body: JSON.stringify({ plant_id: plant.id }), // Send the plant_id in the request body
    };

    fetch(`/api/plants/user/${currentUser.id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add plant to collection.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Plant added to collection:", data);
        // Handle any success message or state updates as needed
      })
      .catch((error) => {
        console.error("Error adding plant to collection:", error);
      });
  };

  return (
    <div className="font-ibarra flex justify-center items-center">
      <div className="bg-white border border-gray-800 rounded-lg p-4 max-w-md">
        <h1 className="text-black text-4xl mb-4 flex justify-center">
          {plant.latin}
        </h1>
        <p className="text-black text-xl flex justify-center">
          Commonly Known as:{" "}
          {JSON.parse(plant.common_names)
            ? JSON.parse(plant.common_names)[0]
            : plant.latin}
        </p>
        <div className="flex justify-center">
          {" "}
          {/* Center the img */}
          <img src={plant.img} className="w-64 h-64 rounded-lg mb-4" />
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Plant Family */}
          Plant Family: {plant.family}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Category */}
          Category: {plant.category}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Origin */}
          Origin: {plant.origin}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Climate */}
          Climate: {plant.climate}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Ideal Lighting */}
          Ideal Lighting: {plant.ideal_light}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          {/* Center the Watering Instructions */}
          <p>Watering Instructions: {plant.watering}</p>
        </div>
        <div className="flex justify-center">
          {" "}
          {/* Center the button */}
          <button
            className="border-black border-2 rounded-md"
            onClick={handleAddToCollection}
          >
            Add to Your Collection!
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndPlantCard;
