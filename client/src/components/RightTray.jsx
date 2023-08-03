import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/headerlogo.png";

function RightTray({
  currentUser,
  setIsLoggedIn,
  setCurrentUser,
  handleRightTrayClick,
}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogOut() {
    fetch("/api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setError("Invalid email or password");
        }
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred. Please try again later.");
      });
  };

  const handleLoginButtonClick = () => {
    setEmail("");
    setPassword("");
    setError("");
    handleRightTrayClick();
  };

  return currentUser ? (
    <div className="flex flex-col fixed right-2 items-center w-60 pt-8 h-2/3 border-2 bg-white border-black font-ibarra z-50">
      <div
        className="absolute top-4 left-4 cursor-pointer text-lg"
        onClick={() => {
          handleRightTrayClick();
        }}
      >
        X
      </div>
      <p className="pt-4 text-xl">Welcome,</p>
      <div className="text-xl border-b-2 border-black">{currentUser.name}</div>

      <div
        className="cursor-pointer pt-3"
        onClick={() => {
          navigate("/account/settings");
          handleRightTrayClick();
        }}
      >
        Settings
      </div>
      <button
        onClick={handleLogOut}
        className="border-slate-300 rounded border-2 mt-4 cursor-pointer"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex flex-col fixed right-2 items-center w-60 pt-8 h-2/3 border-2 bg-white border-black font-ibarra z-50">
      <p className="pt-5">You're not logged in!</p>
      <div
        className="absolute top-4 left-4 cursor-pointer text-lg"
        onClick={() => {
          handleRightTrayClick();
        }}
      >
        X
      </div>

      <form onSubmit={handleLogIn}>
        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-2 py-1 border rounded"
          />
        </div>
        {error && (
          <p className="border-slate-300 rounded border-2 mt-4 cursor-pointer mb-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="px-4 py-2 border-slate-300 rounded border-2 mt-4 cursor-pointer"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleLoginButtonClick}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RightTray;
