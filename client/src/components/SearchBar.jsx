import React from "react";

function SearchBar({ onSearch }) {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center font-ibarra ">
      <input
        className="border-lime-800 border-2 p-1 rounded-3xl w-60 text-center"
        type="text"
        placeholder="Search by Common/Latin name"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
