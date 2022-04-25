import React from "react";

const DemoCard = ({ children }) => (
  <div className="p-2 h-full">
    <div className="shadow border rounded w-full hover:scale-105 transition-all duration-150 cursor-pointer h-full">
      {children}
    </div>
  </div>
);

export default DemoCard;
