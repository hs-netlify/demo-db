import React from "react";

const Grid = ({ children }) => (
  <div className="flex w-full items-center justify-center">
    <div className="w-full grid grid-cols-auto-fit justify-center p-4  ">
      {children}
    </div>
  </div>
);

export default Grid;
