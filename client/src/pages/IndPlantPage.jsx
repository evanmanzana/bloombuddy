import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IndPlantCard from "../components/IndPlantCard";
import NoAccess from "./NoAccess";

function IndPlantPage({ currentUser, isLoggedIn }) {
  const [plant, setPlant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log("ID:", id);

    const fetchIndPlant = async () => {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (res.ok) {
          const plantData = await res.json();
          console.log("Plant Data:", plantData);
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

  if (!isLoggedIn) {
    return <NoAccess />;
  }

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
