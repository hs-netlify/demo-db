import React from "react";
import Link from "next/link";

const DemoCard = ({ children, siteId }) => (
  <div className="p-2 h-full">
    <Link href={{ pathname: `/demo/${siteId}` }} passHref>
      <div className="shadow bg-white border rounded w-full hover:scale-105 transition-all duration-150 cursor-pointer h-full">
        {children}
      </div>
    </Link>
  </div>
);

export default DemoCard;
