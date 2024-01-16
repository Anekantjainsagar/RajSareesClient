"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineFilter,
  AiOutlineUp,
} from "react-icons/ai";
import { sansation } from "@/app/Utils/font";
import gsap, { Power2 } from "gsap";
import ProductBlock from "./ProductBlock";
import Context from "../Context/Context";

const Products = () => {
  const {
    products,
    categories,
    sortStore,
    setSortStore,
    categoryFilter,
    setCategoryFilter,
    search,
  } = useContext(Context);
  const openSidebar = () => {
    gsap.fromTo(
      "#sidebar",
      { x: "50%" },
      { x: "-100%", ease: Power2.easeInOut, duration: 1 }
    );
  };
  const closeSidebar = () => {
    gsap.fromTo(
      "#sidebar",
      { x: "-100%" },
      { x: "50%", ease: Power2.easeInOut, duration: 1 }
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
          <FilterBlock
            name="Category"
            value={categories}
            current={categoryFilter}
            setCurrent={setCategoryFilter}
          />
        </div>
      </div>
      <div className="md:w-10/12 md:ml-4">
        <div className="flex items-start md:items-center justify-between mb-4 -mt-1">
          <h1 className="md:text-xl text-gray-500">
            Search Results for{" "}
            <span className="text-grey">&quot;{search}&quot;</span>
          </h1>
          <div className="flex items-center">
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="text-gray-700 outline-none px-3 py-1.5 rounded-md border"
            >
              {[
                "Relevance",
                "New Arrivals",
                "Price (High to Low)",
                "Price (Low to High)",
                "Ascending",
                "Descending",
                "Oldest",
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
          {products
            ?.sort((a, b) => {
              if (sortStore === "Price (High to Low)") {
                let fa = a.price,
                  fb = b.price;

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              } else if (sortStore == "Price (Low to High)") {
                let fa = a.price,
                  fb = b.price;

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              } else if (sortStore === "Descending") {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              } else if (sortStore == "Ascending") {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              } else if (sortStore === "Oldest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fb - fa;
              } else if (sortStore === "New Arrivals") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fa - fb;
              }
              return 0;
            })
            ?.map((e, i) => {
              return <ProductBlock key={i} data={e} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Line = () => {
  return <div className="h-[1px] w-full bg-gray-100 my-2"></div>;
};

const FilterBlock = ({ name, value, current, setCurrent }) => {
  const [showFilter, setShowFilter] = useState(true);

  return (
    <>
      <div
        onClick={(e) => {
          setShowFilter(!showFilter);
        }}
        className="flex items-center md:text-base text-lg justify-between py-0.5 cursor-pointer"
      >
        <p className="font-medium">{name}</p>
        {showFilter && <AiOutlineUp />}
        {!showFilter && <AiOutlineDown />}
      </div>
      {showFilter && (
        <>
          <div className="px-1">
            {value?.map((e, i) => {
              return (
                <CheckboxBlock
                  key={i}
                  data={e}
                  current={current}
                  setCurrent={setCurrent}
                />
              );
            })}
          </div>
          {current && (
            <div
              onClick={(e) => {
                setCurrent("");
              }}
              className="flex text-grey text-sm justify-end items-center"
            >
              <div className="border px-2 py-0.5 rounded-md flex items-center cursor-pointer mt-1">
                <AiOutlineClose className="mr-1" />
                Clear{" "}
                <span className="mx-1 text-black font-medium">{name}</span>
                Filter
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const CheckboxBlock = ({ data, current, setCurrent }) => {
  return (
    <div
      onClick={(e) => {
        let temp = current;
        setCurrent(data?._id);
      }}
      className="flex items-center my-1.5 md:my-1"
    >
      <input
        type="checkbox"
        id={data?.title}
        checked={current?.includes(data?._id)}
        className="h-5 md:h-4 w-5 md:w-4 rounded-md border-none bg-brown"
      />
      <label
        htmlFor={data?.title}
        className="cursor-pointer md:text-base text-lg ml-2 text-gray-600"
      >
        {data?.title}
      </label>
    </div>
  );
};

export default Products;
