import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ setSearch, search, tags, setTags, add }) => {
  const [state, setState] = useState();
  const suggestions = useRef([]);
  const [sug, setSug] = useState([]);

  useEffect(() => {
    suggestions.current = [];
    const res = [];

    tags &&
      tags.length > 0 &&
      tags.forEach((tag) => {
        if (
          state &&
          tag &&
          tag.toLowerCase().match(`${state.toLowerCase()}.*`, "g")
        )
          if (!search || search.length === 0 || !search.includes(tag)) {
            res.push(tag);
          }
      });
    suggestions.current = res;
    setSug(suggestions.current);
  }, [state, search, tags]);

  const updateSearchList = (tag) => {
    search && search.length > 0
      ? setSearch([...search, tag])
      : setSearch([tag]);
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

  const addTag = async (tag) => {
    setTags([...search, tag]);
    setSearch([...search, tag]);
    setState("");
  };

  return (
    <div className="w-full flex flex-col  ">
      <div className="relative">
        <input
          type="text"
          className="rounded-full active:border-teal-100 w-full shadow border p-2 px-6"
          placeholder="Search Tags"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
        <div className="absolute top-0 left-24 flex items-center h-full">
          {suggestions.current.map((suggestion, i) =>
            i < 6 ? (
              <div
                onClick={() => {
                  updateSearchList(suggestion);
                }}
                key={suggestion}
                className="tag cursor-pointer hover:bg-teal-100"
              >
                {suggestion}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
        {add && state && !tags?.includes(state.toLowerCase()) && (
          <div className="absolute top-1 right-1 z-10">
            <div
              onClick={() => {
                addTag(state.toLowerCase());
              }}
              className="rounded-r-full cursor-pointer  border bg-gray-200 hover:bg-teal-200 py-1  px-6"
            >
              Add
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap p-2 min-h-12">
        {search &&
          search.map((i) => (
            <div
              onClick={() => {
                removeTagFromList(i);
              }}
              key={i}
              className="tag cursor-pointer hover:bg-red-200"
            >
              {i}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
