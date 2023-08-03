import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlantCard() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch("/api/plants");
        if (!res.ok) {
          throw new Error("Failed to fetch plants");
        }
        const myPlants = await res.json();
        setPlants(myPlants);
      } catch (error) {
        console.log("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  function getIndPlant(id) {
    const fetchIndPlant = async (id) => {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch individual plant");
        }
        const myIndPlant = await res.json();
        navigate(`/plant/${id}`);
      } catch (error) {
        console.log("Error fetching individual plant:", error);
      }
    };
    fetchIndPlant(id);
  }

  return (
    <>
      <div className="flex items-center justify-center font-ibarra">
        <div className="grid grid-cols-4 gap-4 p-6">
          {plants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => getIndPlant(plant.id)}
              className="border-2 border-green-900 rounded-lg hover:border-green-400 hover:cursor-pointer relative overflow-hidden "
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "backdrop-filter 0.5s",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-20 transition-opacity"
                style={{
                  backdropFilter: "blur(5px)", // Adjust blur as needed
                }}
              />
              <img
                src={plant.img}
                alt="Plant"
                className="w-full h-80 rounded-md"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-black text-center opacity-0 hover:opacity-100 transition-opacity">
                <p className="font-bold text-white text-4xl bg-gray-500">
                  {JSON.parse(plant.common_names)
                    ? JSON.parse(plant.common_names)[0]
                    : plant.latin}
                </p>
                {/* <p className="font-bold">Latin name: {plant.latin}</p>
                <p className="font-bold">Plant Family: {plant.family}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantCard;
