import React from "react";
import Link from "next/link";

const Header = () => (
  <div className="flex h-20  text-white items-center px-20 bg-black shadow">
    <ul>
      <Link href="/" passHref>
        <li className="cursor-pointer">Home</li>
      </Link>
    </ul>
  </div>
);

export default Header;
