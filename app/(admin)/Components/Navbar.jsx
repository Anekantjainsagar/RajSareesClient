import Image from "next/image";
import React from "react";
import logo from "@/app/Assets/logo.png";
import { BiWorld } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className="flex items-center px-4 bg-white py-1.5 border-b">
      <Image src={logo} alt="Logo" className="w-[3vw] mr-2" />
    </div>
  );
};

export default Navbar;
