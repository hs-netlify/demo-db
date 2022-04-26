import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import React, { useState, useEffect, useRef } from "react";
import ReactTags from "react-tag-autocomplete";

const SearchBar = ({ setSearch, search, tags }) => {
  const [state, setState] = useState();
  const suggestions = useRef([]);
  const [sug, setSug] = useState([]);

  useEffect(() => {
    suggestions.current = [];
    const res = [];

    tags.forEach((tag) => {
      if (state && tag.toLowerCase().match(`${state.toLowerCase()}.*`, "g"))
        if (!search.includes(tag)) {
          res.push(tag);
        }
    });
    suggestions.current = res;
    setSug(suggestions.current);
  }, [state, search, tags]);

  const updateSearchList = (tag) => {
    setSearch([...search, tag]);
    setState("");
  };

  const removeTagFromList = (tag) => {
    var array = [...search];
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === tag) {
        array.splice(i, 1);
      }
      setSearch(array);
    }
  };

  return (
    <div className="w-full flex flex-col px-20 ">
      <div className="relative">
        <input
          type="text"
          className="rounded-full w-full shadow border p-2 px-6"
          placeholder="Search"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
        <div className="absolute top-0 left-40 flex items-center h-full">
          {suggestions.current.map((suggestion, i) =>
            i < 6 ? (
              <div
                onClick={() => {
                  updateSearchList(suggestion);
                }}
                key={suggestion}
                className="rounded cursor-pointer hover:bg-blue-300 bg-blue-400 shadow mx-1 text-white p-1 px-2"
              >
                {suggestion}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
      <div className="flex p-2 h-12">
        {search.map((i) => (
          <div
            onClick={() => {
              removeTagFromList(i);
            }}
            key={i}
            className="rounded cursor-pointer bg-blue-400 mx-1 shadow text-white p-1 px-2 hover:bg-red-400"
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
