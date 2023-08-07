import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import PlantPage from "./pages/PlantPage";
import IndPlantPage from "./pages/IndPlantPage";
import NavBar from "./components/NavBar";
import Collection from "./pages/Collection";
import Tasks from "./pages/Tasks";
import Blog from "./pages/Blog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isRightTrayVisible, setIsRightTrayVisible] = useState(false);
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
  return (
    <>
      <Router>
        <nav>
          <NavBar
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
            isLoggedIn={isLoggedIn}
            setIsRightTrayVisible={setIsRightTrayVisible}
            isRightTrayVisible={isRightTrayVisible}
          />
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            setIsRightTrayVisible={setIsRightTrayVisible}
            isRightTrayVisible={isRightTrayVisible}
          />
          <Route
            path="/*"
            element={<ErrorPage />}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
          />
          <Route
            path="/profile"
            element={<Profile />}
            currentUser={currentUser}
            setIsRightTrayVisible={setIsRightTrayVisible}
            isRightTrayVisible={isRightTrayVisible}
          />
          <Route
            path="/collection"
            element={
              <Collection
                isLoggedIn={isLoggedIn}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
          <Route
            path="/plants"
            element={
              <PlantPage
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
          <Route
            path="/plant/:id"
            element={
              <IndPlantPage
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
          <Route
            path="/blog"
            element={
              <Blog
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
          <Route
            path="account/settings"
            element={
              <Profile
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
                setIsRightTrayVisible={setIsRightTrayVisible}
                isRightTrayVisible={isRightTrayVisible}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
