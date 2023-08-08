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
      <div className="flex justify-center items-center font-ibarra">
        <div className="grid grid-cols-4 gap-4 p-6">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className=" w-80">
              <img
                onClick={() => getIndPlant(plant.id)}
                src={plant.img}
                className=" h-80 w-80 rounded-lg"
              />
              <div className="grid grid-cols-2">
                <div className="pt-2">
                  <p className=" text-2xl">
                    {JSON.parse(plant.common_names)
                      ? JSON.parse(plant.common_names)[0]
                      : plant.latin}
                  </p>
                  <p className="">{plant.latin}</p>
                </div>
                <div>
                  {" "}
                  <div
                    onClick={() => getIndPlant(plant.id)}
                    className=" text-lime-800  mt-2 rounded-xl text-xl hover:underline text-center flex justify-right cursor-pointer"
                  >
                    <p>Click for more info!</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantCard;
