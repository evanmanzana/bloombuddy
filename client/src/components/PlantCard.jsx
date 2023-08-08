import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; // Adjust the path based on your file structure

function PlantCard() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
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
        setFilteredPlants(myPlants); // Initialize filteredPlants with all plants
      } catch (error) {
        console.log("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = plants.filter(
      (plant) =>
        JSON.parse(plant.common_names)?.some((name) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || plant.latin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPlants(filtered);
  };

  function getIndPlant(id) {
    const fetchIndPlant = async (id) => {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch individual plant");
        }
        const myIndPlant = await res.json();
        navigate(`/plants/${id}`);
      } catch (error) {
        console.log("Error fetching individual plant:", error);
      }
    };
    fetchIndPlant(id);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="flex items-center justify-center font-ibarra">
        <div className="grid grid-cols-4 gap-4 p-6">
          {filteredPlants.map((plant) => (
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
                className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-20 transition-transform"
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
                <p className="font-bold text-amber-50 text-4xl bg-slate-500 rounded-lg p-1">
                  {JSON.parse(plant.common_names)
                    ? JSON.parse(plant.common_names)[0]
                    : plant.latin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantCard;
