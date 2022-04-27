import React from "react";

const DemoDetail = ({ demo }) => (
  <div className="flex relative items-center flex-col p-2 h-full">
    <h1 className="p-1 w-full border-b text-center">{demo.name}</h1>

    <img
      alt="No Image"
      className="mt-4"
      layout="fill"
      src={demo.screenshot_url}
    />
    <div className="hover:opacity-100 rounded opacity-0 absolute top-0 transition-all p-6 duration-150 left-0 h-full w-full flex flex-col justify-between items-center px-8 bg-black bg-opacity-80 text-white">
      <div></div>
      <p>{demo.description}</p>
      <div className="flex flex-wrap">
        {demo.tags
          ? demo.tags.map((tag) => (
              <p
                className="bg-blue-400 text-white rounded px-2 py-1 m-1"
                key={tag}
              >
                {tag}
              </p>
            ))
          : null}
      </div>
    </div>
  </div>
);
export default DemoDetail;
