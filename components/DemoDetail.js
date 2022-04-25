import React from "react";

export const DemoDetail = ({ demo }) => (
  <div className="flex relative items-center flex-col p-2 h-full">
    <h1 className="p-2">{demo.name}</h1>

    <img
      alt={process.env.NEXT_PUBLIC_BASE_URL + "/broken-1.png"}
      layout="fill"
      src={demo.screenshot_url}
    />
    <div className="hover:opacity-100 rounded opacity-0 absolute top-0 transition-all duration-150 left-0 h-full w-full flex justify-center items-center px-8 bg-black bg-opacity-80 text-white">
      <p>IPSOM LIP SORIEN ASFDKLADFJDLK FDIOFSEFJ {demo.description}</p>
    </div>
  </div>
);
