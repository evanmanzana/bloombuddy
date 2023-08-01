import React from "react";
import LoginModal from "../components/LoginModal";

function LoginPage({ setIsLoggedIn, setCurrentUser }) {
  return (
    <>
      <div className="bg-white h-screen w-screen z-50 border-green-600 border-2 pl-24 pt-8">
        <LoginModal
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      </div>
    </>
  );
}

export default LoginPage;
