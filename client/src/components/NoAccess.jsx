import React from "react";
import { Link } from "react-router-dom";

function NoAccess({ handleRightTrayClick }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-ibarra p-5">We're Sorry,</h2>
        <p className="text-4xl font-ibarra p-5">
          The page you requested requires you to be logged in.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <p className="text-4xl font-ibarra p-5 hover:underline cursor-pointer">
              Go Back Home?
            </p>
          </Link>
          <p className="text-4xl font-ibarra p-5 ">Or</p>
          <p
            className="text-4xl font-ibarra p-5 hover:underline cursor-pointer"
            onClick={() => {
              handleRightTrayClick;
            }}
          >
            Login?
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoAccess;
