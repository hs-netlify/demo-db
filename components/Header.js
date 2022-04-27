import React from "react";
import Link from "next/link";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => (
  <div className="flex h-20 items-center px-32 justify-between">
    <div className="flex w-full justify-start">
      <Link href="/" passHref>
        <div className="rounded-full hover:opacity-80 cursor-pointer text-xl border-2 flex justify-center items-center h-12 w-12  border-teal-600 text-teal-600">
          <FontAwesomeIcon className="w-6" icon={faHome} />
        </div>
      </Link>
    </div>

    <div className="w-full flex justify-end">
      <img
        className="h-36"
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/Netlify-Logo.svg`}
      />
    </div>
  </div>
);

export default Header;
