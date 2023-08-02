import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IndPlantCard from "../components/IndPlantCard";

function IndPlantPage({ currentUser }) {
  const [plant, setPlant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log("ID:", id); // Check if the ID parameter is being received correctly

    const fetchIndPlant = async () => {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (res.ok) {
          const plantData = await res.json();
          console.log("Plant Data:", plantData); // Check if the API call is returning the expected data
          setPlant(plantData);
        } else {
          setPlant(null);
        }
      } catch (error) {
        console.error("Error fetching individual plant:", error);
      }
    };
    fetchIndPlant();
  }, [id]);

  return (
    <div>
      {plant ? (
        <IndPlantCard plant={plant} currentUser={currentUser} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default IndPlantPage;
