import React, { useState } from "react";
import Hero from "../components/Hero";

import About from "../components/About";
function Home({ currentUser }) {
  return (
    <>
      <Hero currentUser={currentUser} />
      <About currentUser={currentUser} />
    </>
  );
}

export default Home;
