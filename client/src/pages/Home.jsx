import React, { useState } from "react";
import Hero from "../components/Hero";

import About from "../components/About";
function Home({ currentUser, isLoggedIn }) {
  // console.log("isLoggedIn:", isLoggedIn);
  // console.log("currentUser:", currentUser);
  return (
    <>
      <div className="">
        <Hero currentUser={currentUser} isLoggedIn={isLoggedIn} />
        <About currentUser={currentUser} isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
}

export default Home;
