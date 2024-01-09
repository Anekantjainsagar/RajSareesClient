import React from "react";
import logo from "@/app/Assets/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="bg-orange shadow-md shadow-gray-300 fixed top-0 left-0 w-full">
        <div className="flex items-center py-0.5 px-7 justify-between">
          <Image alt="Logo" src={logo} className="w-[5vw]" />
          <div className="flex items-center">
            <CiSearch size={30} className="mr-5" />
            <FaUser size={30} className="mr-5" />
            <FaHeart size={30} className="mr-5" />
            <FaShoppingCart size={30} className="mr-5" />
          </div>
        </div>
        <div className="h-[1px] bg-gray-200 mx-4"></div>
        <div className="flex items-center justify-between py-2 px-[7vw] text-lg">
          {[
            "New Arrivals",
            "Ethinic Wear",
            "Party Wear",
            "Festive Sarees",
            "Wedding Sarees",
          ].map((e) => {
            return <p key={e}>{e}</p>;
          })}
        </div>
      </div>
      <div className="py-[4.2vw]"></div>
    </>
  );
};

export default Navbar;
