import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import PlantPage from "./pages/PlantPage";
import IndPlantPage from "./pages/IndPlantPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import Collection from "./pages/Collection";
import Tasks from "./pages/Tasks";
import Blog from "./pages/Blog";

function App() {
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
  return isLoggedIn ? (
    <Router>
      <nav>
        <NavBar
          currentUser={currentUser}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} currentUser={currentUser} />
        <Route path="/*" element={<ErrorPage />} currentUser={currentUser} />
        <Route
          path="/profile"
          element={<Profile />}
          currentUser={currentUser}
        />
        <Route
          path="/collection"
          element={
            <Collection
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/plants"
          element={<PlantPage currentUser={currentUser} />}
          // plants={plants}
        />
        <Route
          path="/plants/:id"
          element={<IndPlantPage currentUser={currentUser} />}
        />
        <Route path="/blog" element={<Blog currentUser={currentUser} />} />
        <Route path="/tasks" element={<Tasks currentUser={currentUser} />} />
        <Route
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
          path="/login"
        />
      </Routes>
    </Router>
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
  );
}

export default App;
