import React from "react";

const Wrapper = ({ children }) => (
  <div className="flex justify-center w-full">
    <div className="max-w-7xl">{children}</div>
  </div>
);

export default Wrapper;
