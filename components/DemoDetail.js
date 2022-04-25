import React from "react";

const DemoDetail = ({ demo }) => (
  <div className="flex relative items-center flex-col p-2 h-full">
    <h1 className="p-2">{demo.name}</h1>

    <img alt="No Image" layout="fill" src={demo.screenshot_url} />
    <div className="hover:opacity-100 rounded opacity-0 absolute top-0 transition-all duration-150 left-0 h-full w-full flex justify-center items-center px-8 bg-black bg-opacity-80 text-white">
      <p>{demo.description}</p>
    </div>
  </div>
);
export default DemoDetail;
