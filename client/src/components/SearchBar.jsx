import React from "react";

function SearchBar() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="instant_search"
    ></InstantSearch>
  );
}

export default SearchBar;
