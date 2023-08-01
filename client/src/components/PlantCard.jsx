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
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 p-6">
          {plants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => getIndPlant(plant.id)}
              className="border-2 border-gray-400 p-4 rounded-md hover:border-black hover: cursor-pointer"
            >
              <p className="font-bold">
                {JSON.parse(plant.common_names)
                  ? JSON.parse(plant.common_names)[0]
                  : plant.latin}
              </p>
              <img src={plant.img} alt="Plant" className="w-32 h-32" />
              <p className="font-bold">Latin name: {plant.latin}</p>
              <p className="font-bold">Plant Family: {plant.family}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantCard;
