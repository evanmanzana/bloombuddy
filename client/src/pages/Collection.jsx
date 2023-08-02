import React, { useState, useEffect } from "react";

function Collection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => {
          setCurrentUser(currentUser);
          setIsLoggedIn(true);
        });
      }
    });
  }, []);
  console.log(isLoggedIn);
  return isLoggedIn ? (
    <div className="flex justify-center items-center h-screen font-ibarra">
      <div className="text-center">
        <h2 className="text-4xl text-red-500">Plant Collection</h2>
        {currentUser.plants_list.length > 0 ? (
          <div>
            {currentUser.plants_list.map((plant) => (
              <div key={plant.id}>
                <p>Latin name: {plant.latin}</p>
                <img src={plant.img} alt={plant.latin} />
                <p>Plant Family: {plant.family}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Looks like you don't have a collection yet!</p>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen font-ibarra">
      <div className="text-center">
        <h2 className="text-4xl text-red-500">ERROR</h2>
        <p>Looks like you aren't logged in!</p>
      </div>
    </div>
  );
}

export default Collection;
