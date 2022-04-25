import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ setSearch }) => {
  const initial = useRef(true);
  const [state, setState] = useState("");

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearch(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSearch, state]);

  return (
    <div className="w-full px-20">
      <input
        type="text"
        className="rounded-full w-full shadow border p-2 px-6"
        placeholder="Search"
        value={state}
        onChange={(e) => setState(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
