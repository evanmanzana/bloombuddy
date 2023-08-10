import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bloombuddy.png";
import Modal from "react-modal";

function IndPlantCard({ plant, currentUser }) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCollection = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plant_id: plant.id }),
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
        setIsAdded(true); // Set the state to indicate the plant has been added
        setIsModalOpen(true); // Open the modal popup
      })
      .catch((error) => {
        console.error("Error adding plant to collection:", error);
      });
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/blooms"); // Redirect to the /blooms page
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
          <img src={plant.img} className="w-64 h-64 rounded-lg mb-4" />
        </div>
        <div className="text-black flex justify-center">
          {" "}
          Plant Family: {plant.family}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          Category: {plant.category}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          Origin: {plant.origin}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          Climate: {plant.climate}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          Ideal Lighting: {plant.ideal_light}
        </div>
        <div className="text-black flex justify-center">
          {" "}
          <p>Watering Instructions: {plant.watering}</p>
        </div>
        <div className="flex justify-center">
          {" "}
          <div className="flex justify-center">
            <button
              className="border-black border-2 rounded-md"
              onClick={handleAddToCollection}
            >
              Add to Your Collection!
            </button>
            {isAdded && (
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModalAndRedirect}
                className="fixed inset-0 flex items-center justify-center z-50"
              >
                <div className="bg-white p-6 rounded-md shadow-md">
                  <div className="text-center">
                    <img src={logo} alt="Logo" className="mx-auto mb-4" />
                    <p className="text-green-500 text-sm">
                      Added{" "}
                      {JSON.parse(plant.common_names)
                        ? JSON.parse(plant.common_names)[0]
                        : plant.latin}{" "}
                      to your collection
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2"
                        onClick={() => {
                          closeModalAndRedirect();
                          navigate("/plants");
                        }}
                      >
                        Continue looking at plants
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                        onClick={() => {
                          closeModalAndRedirect();
                          navigate("/blooms"); // Redirect to /blooms
                        }}
                      >
                        View your blooms
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndPlantCard;
