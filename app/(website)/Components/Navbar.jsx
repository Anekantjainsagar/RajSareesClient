"use client";
import React, { useContext } from "react";
import logo from "@/app/Assets/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Context from "../Context/Context";
import { useRouter } from "next/navigation";
import Search from "./Search";
import { sansation } from "@/app/Utils/font";

const Navbar = () => {
  const history = useRouter();
  const {
    loginModalOpen,
    setLoginModalOpen,
    login,
    showSearchBar,
    setShowSearchBar,
    categories,
    setSortStore,
    setCategoryFilter,
  } = useContext(Context);

  return (
    <>
      <div className="bg-orange text-grey fixed top-0 left-0 z-50 w-[100vw] md:w-full">
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
            <FaHeart
              onClick={(e) => {
                history.push("/wishlist");
              }}
              className="ml-5 text-xl md:text-3xl cursor-pointer"
            />
            <FaShoppingCart
              onClick={(e) => {
                history.push("/cart");
              }}
              className="ml-5 text-xl md:text-3xl cursor-pointer"
            />
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
        <div className="bg-gradient-to-r from-[#e9ab2600] via-newYellow to-[#e9ab2600] h-[1px] my-2 w-full"></div>
        <div
          className={`${sansation.className} flex items-center justify-between py-2 px-4 md:px-[5vw] md:text-lg`}
        >
          <p
            onClick={(e) => {
              setSortStore("New Arrivals");
              setCategoryFilter("");
              history.push("/products");
            }}
            className="text-center md:text-lg hover:border-b border-b-grey text-sm cursor-pointer"
          >
            New Arrivals
          </p>
          {categories
            ?.reverse()
            ?.slice(1, 5)
            ?.map((e, i) => {
              return (
                <p
                  key={i}
                  onClick={(ev) => {
                    setCategoryFilter(e?._id);
                    history.push("/products");
                  }}
                  className="text-center md:text-lg hover:border-b border-b-grey text-sm cursor-pointer"
                >
                  {e?.title}
                </p>
              );
            })}
        </div>
      </div>
      <div className="py-[14vw] md:py-[4.2vw]"></div>
    </>
  );
};

export default Navbar;
