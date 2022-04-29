import React from "react";

const Loading = () => (
  <div className="flex h-screen w-full flex-col items-center justify-center">
    <img className="w-40 animate-spin" src="logo-small.png" />
    <h1 className="p-6">Loading</h1>
  </div>
);

export default Loading;
