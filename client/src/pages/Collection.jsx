import React, { useState, useEffect } from "react";
import NoAccess from "./NoAccess";

function Collection({
  isLoggedIn,
  currentUser,
  isRightTrayVisible,
  setIsRightTrayVisible,
}) {
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
    fetch(`/api/plants/user/${currentUser.id}?plant_id=${plantId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete plant from collection.");
        }

        setPlants((prevPlants) =>
          prevPlants.filter((plant) => plant.plant.id !== plantId)
        );
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
      });
  };

  if (!isLoggedIn) {
    return (
      <NoAccess
        isRightTrayVisible={isRightTrayVisible}
        setIsRightTrayVisible={setIsRightTrayVisible}
      />
    );
  }

  return (
    <div className="flex items-center justify-center font-ibarra">
      <div>
        <h2 className="text-4xl text-green-800 flex justify-center  pb-2">
          Your Blooms
        </h2>
        {plants.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 p-6 justify-center">
            {plants.map((plant) => (
              <div
                key={plant.plant.id}
                className="grid grid-cols-1  rounded-md"
              >
                <img src={plant.plant.img} className=" h-80 w-80 rounded-sm" />
                <div className="grid grid-cols-2">
                  <div className="pt-2">
                    <p className=" text-2xl">
                      {JSON.parse(plant.plant.common_names)
                        ? JSON.parse(plant.plant.common_names)[0]
                        : plant.latin}
                    </p>
                    <p className="">{plant.plant.latin}</p>
                  </div>
                  <div>
                    {" "}
                    <button
                      className=" text-lime-800  mt-2 rounded-xl text-xl hover:underline"
                      onClick={() => handleDeletePlant(plant.plant.id)}
                    >
                      Delete From Collection
                    </button>
                  </div>
                </div>
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
