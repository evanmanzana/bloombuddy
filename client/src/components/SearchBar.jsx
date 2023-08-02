import React from "react";

function SearchBar({ onSearchChange }) {
  return (
    <div className="flex justify-center items-center font-ibarra">
      <input
        type="text"
        className="w-auto border-black border-2 rounded-2xl hover:w-56"
        placeholder="Search by Latin/Common Name"
        onChange={onSearchChange}
      />
    </div>
  );
}

export default SearchBar;
