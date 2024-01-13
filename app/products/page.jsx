"use client";
import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineFilter,
  AiOutlineUp,
} from "react-icons/ai";
import { sansation } from "../Utils/font";
import gsap, { Power2 } from "gsap";
import ProductBlock from "./ProductBlock";

const Products = () => {
  const openSidebar = () => {
    gsap.fromTo(
      "#sidebar",
      { x: 0 },
      { x: -310, ease: Power2.easeInOut, duration: 1 }
    );
  };

  const closeSidebar = () => {
    gsap.fromTo(
      "#sidebar",
      { x: -310 },
      { x: 0, ease: Power2.easeInOut, duration: 1 }
    );
  };

  return (
    <div
      className={`${sansation.className} py-10 px-[4vw] flex items-start justify-between`}
    >
      <div
        id="sidebar"
        className="md:static fixed bg-white w-[75vw] md:h-fit right-[-75vw] h-[100vh] top-0 md:w-2/12 md:z-0 z-50"
      >
        <div className="border px-4 rounded-md py-3 overflow-y-auto md:py-2">
          <div className="flex items-center justify-between">
            <p className="md:text-base text-lg">FILTERS</p>
            <AiOutlineClose
              onClick={(e) => {
                closeSidebar();
              }}
              className="text-2xl md:hidden cursor-pointer"
            />
          </div>
          <Line />
          <FilterBlock />
          <Line />
          <FilterBlock />
          <Line />
          <FilterBlock />
        </div>
      </div>
      <div className="md:w-10/12 md:ml-4">
        <div className="flex items-start md:items-center justify-between mb-4 -mt-1">
          <h1 className="md:text-xl text-gray-500">
            Search Results for{" "}
            <span className="text-grey">&quot;Sarees&quot;</span>
          </h1>
          <div className="flex items-center">
            <select className="text-gray-700 outline-none px-3 py-1.5 rounded-md border">
              {[
                "Relevance",
                "New Arrivals",
                "Price (High to Low)",
                "Price (Low to High)",
                "Ratings",
              ].map((e, i) => {
                return (
                  <option key={i} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
            <AiOutlineFilter
              onClick={(e) => {
                openSidebar();
              }}
              className="text-3xl ml-3 text-grey md:hidden"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-x-6 gap-y-6 px-2">
          <ProductBlock />
          <ProductBlock />
          <ProductBlock />
          <ProductBlock />
          <ProductBlock />
          <ProductBlock />
        </div>
      </div>
    </div>
  );
};

const Line = () => {
  return <div className="h-[1px] w-full bg-gray-100 my-2"></div>;
};

const FilterBlock = () => {
  const [showFilter, setShowFilter] = useState(true);

  return (
    <>
      <div
        onClick={(e) => {
          setShowFilter(!showFilter);
        }}
        className="flex items-center md:text-base text-lg justify-between py-0.5 cursor-pointer"
      >
        <p className="font-medium">Category</p>
        {showFilter && <AiOutlineUp />}
        {!showFilter && <AiOutlineDown />}
      </div>
      {showFilter && (
        <div className="px-1">
          <CheckboxBlock />
          <CheckboxBlock />
        </div>
      )}
    </>
  );
};

const CheckboxBlock = () => {
  return (
    <div className="flex items-center my-1.5 md:my-1">
      <input
        type="checkbox"
        id="checkbox"
        className="h-5 md:h-4 w-5 md:w-4 rounded-md border-none bg-brown"
      />
      <label
        htmlFor="checkbox"
        className="cursor-pointer md:text-base text-lg ml-2 text-gray-600"
      >
        Sarees
      </label>
    </div>
  );
};

export default Products;
