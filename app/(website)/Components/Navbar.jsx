"use client";
import React, { useContext, useState } from "react";
import logo from "@/app/Assets/new-logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Context from "../Context/Context";
import { useRouter } from "next/navigation";
import Search from "./Search";
import { sansation } from "@/app/Utils/font";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const history = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const {
    loginModalOpen,
    setLoginModalOpen,
    login,
    showSearchBar,
    setShowSearchBar,
    categories,
    setSortStore,
    setCategoryFilter,
    cart,
    getUser,
  } = useContext(Context);

  return (
    <>
      <div className="bg-orange text-grey fixed top-0 left-0 z-50 w-[100vw] md:w-full">
        <div className="flex items-center py-1 md:py-0.5 px-3 md:px-7 justify-between">
          <Image
            alt="Logo"
            src={logo}
            className="w-[13vw] md:w-[5.5vw] cursor-pointer"
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
            <div
              onClick={(e) => {
                history.push("/wishlist");
              }}
              className="ml-5 cursor-pointer relative"
            >
              <FaHeart className="text-xl md:text-3xl cursor-pointer" />
              <p className="absolute z-30 bg-white px-1.5 text-sm -right-3 -top-3 border border-grey text-grey rounded-full">
                {login?.wishlist ? login?.wishlist?.length : 0}
              </p>
            </div>
            <div
              onClick={(e) => {
                history.push("/cart");
              }}
              className="ml-5 cursor-pointer relative"
            >
              <p className="absolute z-30 bg-white px-1.5 text-sm -right-3 -top-3 border border-grey text-grey rounded-full">
                {cart?.length}
              </p>
              <FaShoppingCart className="text-xl md:text-3xl cursor-pointer" />
            </div>
            {login?._id ? (
              <div className="relative ml-5">
                <Image
                  src={login?.image}
                  onClick={(e) => {
                    setShowOptions(!showOptions);
                  }}
                  width={100}
                  height={100}
                  className="md:w-[2.6vw] w-[6vw] border border-brown md:h-[2.6vw] h-[6vw] rounded-full object-cover object-center cursor-pointer"
                  alt="User Profile"
                />
                {showOptions && (
                  <div className="absolute flex flex-col items-center w-[30vw] md:w-[8vw] border left-1/2 -translate-x-[90%] top-9 md:text-base text-sm md:top-12 rounded-lg bg-white">
                    <p
                      onClick={(e) => {
                        setShowOptions(false);
                        if (!login?._id) {
                          setLoginModalOpen(!loginModalOpen);
                        } else {
                          history.push("/dashboard");
                        }
                      }}
                      className="text-center py-1 cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={(e) => {
                        setShowOptions(false);
                        if (!login?._id) {
                          setLoginModalOpen(!loginModalOpen);
                        } else {
                          history.push("/dashboard/orders");
                        }
                      }}
                      className="text-center py-1 cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all"
                    >
                      My Orders
                    </p>
                    <p
                      onClick={(e) => {
                        setShowOptions(false);
                        deleteCookie("token");
                        history.push("/");
                        getUser();
                      }}
                      className="text-center py-1 cursor-pointer hover:bg-gray-100 w-full rounded-lg transition-all"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
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
            className="text-center md:text-lg font-semibold hover:border-b border-b-grey text-sm cursor-pointer"
          >
            New Arrivals
          </p>
          {categories?.slice(1, 5)?.map((e, i) => {
            return (
              <p
                key={i}
                onClick={(ev) => {
                  setCategoryFilter(e?._id);
                  history.push("/products");
                }}
                className="text-center md:text-lg font-semibold hover:border-b border-b-grey text-sm cursor-pointer"
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
