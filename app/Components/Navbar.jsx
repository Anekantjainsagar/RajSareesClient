import React from "react";
import logo from "@/app/Assets/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="bg-orange shadow-md shadow-gray-300 fixed top-0 left-0 z-50 w-[100vw] md:w-full">
        <div className="flex items-center py-1 md:py-0.5 px-3 md:px-7 justify-between">
          <Image alt="Logo" src={logo} className="w-[13vw] md:w-[5vw]" />
          <div className="flex items-center">
            <CiSearch className="mr-5 text-xl md:text-3xl cursor-pointer" />
            <FaUser className="mr-5 text-xl md:text-3xl cursor-pointer" />
            <FaHeart className="mr-5 text-xl md:text-3xl cursor-pointer" />
            <FaShoppingCart className="mr-5 text-xl md:text-3xl cursor-pointer" />
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 mx-4"></div>
        <div className="flex items-center justify-between py-2 px-[7vw] md:text-lg">
          {[
            "New Arrivals",
            "Ethinic Wear",
            "Party Wear",
            "Festive Sarees",
            "Wedding Sarees",
          ].map((e) => {
            return (
              <p key={e} className="text-center">
                {e}
              </p>
            );
          })}
        </div>
      </div>
      <div className="py-[13.5vw] md:py-[4.2vw]"></div>
    </>
  );
};

export default Navbar;
