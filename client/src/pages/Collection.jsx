import React, { useState, useEffect } from "react";
import NoAccess from "./NoAccess";
import AddCareTask from "../components/AddCareTask";

function Collection({
  isLoggedIn,
  currentUser,
  isRightTrayVisible,
  setIsRightTrayVisible,
}) {
  const [plants, setPlants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          // console.log("Fetched user plants:", data.user_plants);
          setPlants(data.user_plants);
        })
        .catch((error) => {
          console.error("Error fetching user plants:", error);
        });
    }
  }, [isLoggedIn, currentUser]);

  const handleDeletePlant = (plantId) => {
    // console.log(plantId);
    fetch(`/api/plants/user/${currentUser.id}?plant_id=${plantId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete plant from collection.");
        }
        setTimeout(
          () =>
            setPlants((prevPlants) =>
              prevPlants.filter((plant) => plant.id !== plantId)
            ),
          100
        );
      })
      .catch((error) => {
        console.error("Error deleting plant:", error);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Render the modal content
  const renderModalContent = () => {
    return <div className="modal">{/* Your form content here */}</div>;
  };

  if (!isLoggedIn) {
    return (
      <NoAccess
        isRightTrayVisible={isRightTrayVisible}
        setIsRightTrayVisible={setIsRightTrayVisible}
      />
    );
  }
  console.log(plants);

  return (
    <div className="flex items-center justify-center font-ibarra">
      <div>
        <h2 className="text-4xl text-green-800 flex justify-center pb-2">
          Your Blooms
        </h2>
        {plants.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 p-6 justify-center">
            {plants.map((plant) => (
              <div key={plant.id} className="grid grid-cols-1  rounded-md">
                <img src={plant.plant.img} className=" h-80 w-80 rounded-lg" />
                <div className="grid grid-cols-2">
                  <div className="pt-2">
                    <p className=" text-2xl">
                      {JSON.parse(plant.plant.common_names)
                        ? JSON.parse(plant.plant.common_names)[0]
                        : plant.latin}
                    </p>

                    <p className="">{plant.plant.latin}</p>
                    <AddCareTask userPlantId={plant} />
                  </div>
                  <div>
                    {" "}
                    <button
                      className=" text-lime-800  mt-2 rounded-xl text-xl hover:underline flex justify-center"
                      onClick={() => handleDeletePlant(plant.id)}
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
