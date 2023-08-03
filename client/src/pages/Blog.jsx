import React from "react";
import NoAccess from "../components/NoAccess";

function Blog({ isLoggedIn, currentUser }) {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);
  return isLoggedIn ? (
    <div className="flex justify-center items-center h-screen font-ibarra">
      <div className="text-center">
        <h2 className="text-4xl ">This will be a Blog Page</h2>
      </div>
    </div>
  ) : (
    <NoAccess />
  );
}

export default Blog;
