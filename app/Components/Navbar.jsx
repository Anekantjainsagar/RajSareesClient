"use client";
import React, { useContext } from "react";
import logo from "@/app/Assets/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Context from "../Context/Context";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Search from "./Search";

const Navbar = () => {
  const history = useRouter();
  const {
    loginModalOpen,
    setLoginModalOpen,
    login,
    showSearchBar,
    setShowSearchBar,
  } = useContext(Context);

  return (
    <>
      <div className="bg-orange text-grey shadow-md shadow-gray-300 fixed top-0 left-0 z-50 w-[100vw] md:w-full">
        <div className="flex items-center py-1 md:py-0.5 px-3 md:px-7 justify-between">
          <Image
            alt="Logo"
            src={logo}
            className="w-[13vw] md:w-[5vw] cursor-pointer"
            onClick={(e) => {
              history.push("/");
            }}
          />
          <div className="flex items-center">
            <div className="relative">
              <CiSearch
                onClick={(e) => {
                  setShowSearchBar(!showSearchBar);
                }}
                className="ml-5 text-2xl md:text-3xl cursor-pointer"
              />
              <Search />
            </div>
            <FaHeart className="ml-5 text-xl md:text-3xl cursor-pointer" />
            <FaShoppingCart className="ml-5 text-xl md:text-3xl cursor-pointer" />
            {login?._id ? (
              <Image
                src={login?.image}
                onClick={(e) => {
                  if (!login?._id) {
                    setLoginModalOpen(!loginModalOpen);
                  } else {
                    history.push("/dashboard");
                  }
                }}
                width={100}
                height={100}
                className="md:w-[2.6vw] w-[5.5vw] border border-brown md:h-[2.6vw] h-[5.5vw] ml-5 rounded-full object-cover object-center cursor-pointer"
                alt="User Profile"
              />
            ) : (
              <FaUser
                onClick={(e) => {
                  if (!login?._id) {
                    setLoginModalOpen(!loginModalOpen);
                  } else {
                    history.push("/dashboard");
                  }
                }}
                className="ml-5 text-xl md:text-3xl cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 mx-4"></div>
        <div className="flex items-center justify-between py-2 px-4 md:px-[7vw] md:text-lg">
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
