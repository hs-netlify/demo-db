import React, { useState, useEffect } from "react";
import Link from "next/link";

const DemoCard = ({ children, siteId }) => {
  const [cardOpacity, setCardOpacity] = useState("opacity-0");

  useEffect(() => {
    setCardOpacity("opacity-100");
  }, []);

  return (
    <div className={`${cardOpacity} p-2 h-full transition-all duration-1000`}>
      <Link href={{ pathname: `/demo/${siteId}` }} passHref>
        <div className="shadow bg-white border border-gray-200 rounded w-full hover:scale-105 transition-all duration-150 cursor-pointer h-full">
          {children}
        </div>
      </Link>
    </div>
  );
};

export default DemoCard;
