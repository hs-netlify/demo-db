import React from "react";

const Wrapper = ({ children }) => (
  <div className="flex items-start justify-center h-full w-full pt-4">
    <div className="xl:max-w-screen-xl px-4 w-full  p-2 ">{children}</div>
  </div>
);

export default Wrapper;
