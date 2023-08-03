import React from "react";
import { Link } from "react-router-dom";

function ErrorPage({ isLoggedIn, currentUser }) {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-ibarra">We're Sorry,</h2>
        <p className="text-4xl font-ibarra">
          The page you requested does not exist.
        </p>
        <Link to="/">
          <p className="text-4xl font-ibarra pt-5 hover:underline cursor-pointer">
            Go Back Home?
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
