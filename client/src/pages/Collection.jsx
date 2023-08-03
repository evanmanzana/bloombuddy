import React, { useState, useEffect } from "react";
import NoAccess from "../components/NoAccess";

function Collection({ isLoggedIn, currentUser }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetch(`/api/plants/user/${currentUser.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user plants.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched user plants:", data.user_plants);
          setPlants(data.user_plants);
        })
        .catch((error) => {
          console.error("Error fetching user plants:", error);
        });
    }
  }, [isLoggedIn, currentUser]);

  const handleDeletePlant = (plantId) => {
    // Make a DELETE request to the backend to remove the plant from the user's collection
    fetch(`/api/plants/user/${currentUser.id}?plant_id=${plantId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete plant from collection.");
        }
        // After successful deletion, update the state to remove the deleted plant from the UI
        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.plant.id !== plantId)
        );
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
      });
  };

  if (!isLoggedIn) {
    return <NoAccess />;
  }

  return (
    <div className="flex items-center justify-center font-ibarra">
      <div>
        <h2 className="text-4xl text-green-800 flex justify-center border-b-2 border-black pb-2">
          {currentUser.name} Collection
        </h2>
        {plants.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 p-6 justify-center">
            {plants.map((plant) => (
              <div
                key={plant.plant.id}
                className="grid grid-cols-1 justify-center border-2 border-black rounded-md"
              >
                <p className="flex justify-center text-2xl">
                  {plant.plant.latin}
                </p>
                <img
                  src={plant.plant.img}
                  className="flex justify-center h-80 w-80"
                />
                <p className="flex justify-center">
                  Plant Family: {plant.plant.family}
                </p>
                <button
                  className="bg-green-800 text-white py-2 px-4 mt-2 rounded-md"
                  onClick={() => handleDeletePlant(plant.plant.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="flex justify-center text-4xl pt-6">
            Looks like you don't have a collection yet!
          </p>
        )}
      </div>
    </div>
  );
}

export default Collection;
