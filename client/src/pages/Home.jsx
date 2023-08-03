import React, { useState } from "react";
import Hero from "../components/Hero";

import About from "../components/About";
function Home({ currentUser, isLoggedIn }) {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);
  return (
    <>
      <Hero currentUser={currentUser} isLoggedIn={isLoggedIn} />
      <About currentUser={currentUser} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default Home;
