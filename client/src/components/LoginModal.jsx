import React, { useState, useEffect } from "react";
import logo from "../assets/bloombuddy.png";

function LoginModal({ setIsLoggedIn, setCurrentUser }) {
  // State and event listeners...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleSignIn(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setCurrentUser(data);
            setIsLoggedIn(true);
          });
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred. Please try again later.");
      });
  }

  const closeModal = () => {
    setEmail("");
    setPassword("");
    setError("");
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <img className="h-14 w-auto " src={logo} />
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSignIn}>
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
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
