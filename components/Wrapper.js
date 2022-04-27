import React from "react";

const Wrapper = ({ children }) => (
  <div className="flex items-start justify-center bg-gray-50 h-full w-full pt-4">
    <div className="xl:max-w-screen-xl px-4 w-full bg-white shadow rounded">
      {children}
    </div>
  </div>
);

export default Wrapper;
