import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  connectStateResults,
} from "react-instantsearch-dom";
import { Autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

const searchClient = algoliasearch(
  "YOUR_ALGOLIA_APP_ID",
  "YOUR_ALGOLIA_SEARCH_ONLY_API_KEY"
);

const AlgoliaPlantSearch = () => {
  const searchClient = algoliasearch(
    "YOUR_ALGOLIA_APP_ID",
    "YOUR_ALGOLIA_SEARCH_ONLY_API_KEY"
  );

  const search = connectStateResults(({ searchState }) => (
    <Hits hitComponent={Hit} />
  ));

  return (
    <InstantSearch
      indexName="YOUR_ALGOLIA_INDEX_NAME"
      searchClient={searchClient}
    >
      <Autocomplete
        openOnFocus
        placeholder="Search for plants..."
        autoselect="always"
        onSelected={(event, { item }) => {
          // Handle selection, e.g., navigate to the selected plant's page
          console.log("Selected plant:", item);
        }}
      >
        {({ getInputProps, getRootProps }) => (
          <div {...getRootProps()} className="algolia-search-container">
            <SearchBox {...getInputProps()} />
            <div className="algolia-hits">{search()}</div>
          </div>
        )}
      </Autocomplete>
    </InstantSearch>
  );
};

const Hit = ({ hit }) => (
  <div>
    <div>
      <Highlight attribute="latin" hit={hit} />
    </div>
    <div>
      <Highlight attribute="common_names" hit={hit} />
    </div>
  </div>
);

export default AlgoliaPlantSearch;
