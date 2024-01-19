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
  const [firstValue, setFirstValue] = useState(Number.MAX_SAFE_INTEGER);
  const [secondValue, setSecondValue] = useState(Number.MIN_SAFE_INTEGER);
  const {
    products,
    categories,
    sortStore,
    setSortStore,
    categoryFilter,
    setCategoryFilter,
    setSearch,
    subCategories,
    search,
    genderFilter,
    setGenderFilter,
    colorFilter,
    setColorFilter,
    fabricFilter,
    setFabricFilter,
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

  function handleRanges(value) {
    setFirstValue(value[0]);
    setSecondValue(value[1]);
  }

  useEffect(() => {
    products?.map((e) => {
      if (firstValue > e?.price) {
        setFirstValue(e?.price);
      }
      if (secondValue < e?.price) {
        setSecondValue(e?.price);
      }
    });
  }, [products]);

  return (
    <div
      className={`${sansation.className} py-10 px-[4vw] flex items-start justify-between`}
    >
      <div
        id="sidebar"
        className="md:static fixed bg-white w-[75vw] overflow-y-auto md:h-fit right-[-75vw] h-[100vh] top-0 md:w-2/12 md:z-0 z-50"
      >
        <div className="border px-4 rounded-md py-3 md:py-2">
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
            id={true}
          />
          <Line />
          <FilterBlock
            name="Gender"
            value={subCategories?.gender}
            current={genderFilter}
            setCurrent={setGenderFilter}
          />
          <Line />
          <FilterBlock
            name="Fabric"
            value={subCategories?.fabric}
            current={fabricFilter}
            setCurrent={setFabricFilter}
          />
          <Line />
          <FilterBlock
            name="Color"
            value={subCategories?.color}
            current={colorFilter}
            setCurrent={setColorFilter}
          />
          <Line />
          <PriceBlock
            name={"Price"}
            firstValue={firstValue}
            secondValue={secondValue}
            handleRanges={handleRanges}
          />
        </div>
      </div>
      <div className="md:w-10/12 md:ml-4">
        <h1 className="text-lg md:hidden flex items-center justify-between mb-5 text-gray-500">
          <p>
            Search Results for{" "}
            <span className="text-grey ml-1">&quot;{search}&quot;</span>
          </p>
          {search && (
            <AiOutlineClose
              className="text-lg ml-1 md:ml-4 cursor-pointer"
              onClick={(e) => {
                setSearch("");
              }}
            />
          )}
        </h1>
        <div className="flex items-start md:items-center justify-end md:justify-between mb-4 -mt-1">
          <h1 className="text-lg md:flex hidden md:text-xl items-center text-gray-500">
            Search Results for{" "}
            <span className="text-grey ml-1">&quot;{search}&quot;</span>
            {search && (
              <AiOutlineClose
                className="text-lg ml-1 md:ml-4 cursor-pointer"
                onClick={(e) => {
                  setSearch("");
                }}
              />
            )}
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
        {products?.filter((e) => {
          if (search) {
            return e?.name?.toLowerCase()?.includes(search?.toLowerCase());
          } else {
            return e;
          }
        })?.length > 0 ? (
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
              ?.filter((e) => {
                if (search) {
                  return e?.name
                    ?.toLowerCase()
                    ?.includes(search?.toLowerCase());
                } else {
                  return e;
                }
              })
              ?.map((e, i) => {
                return <ProductBlock key={i} data={e} />;
              })}
          </div>
        ) : (
          <div className="text-2xl md:text-xl md:w-full w-[95vw] text-center text-grey">
            <p>No Product Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Line = () => {
  return <div className="h-[1px] w-full bg-gray-100 my-2"></div>;
};

const FilterBlock = ({ name, value, current, setCurrent, id }) => {
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
                  id={id}
                />
              );
            })}
          </div>
          {current?.length > 0 && (
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

const PriceBlock = ({ name, handleRanges, firstValue, secondValue }) => {
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
      {/* {showFilter && (
        <div className="px-2 mt-2 text-grey py-1">
          <RangeSlider
            defaultValue={[firstValue, secondValue]}
            min={firstValue}
            progress
            max={secondValue}
            onChange={handleRanges}
          />
          <p className="mt-3 px-1 w-full flex items-center justify-between text-sm">
            <span>{firstValue}</span>
            <span>{secondValue}</span>
          </p>
        </div>
      )} */}
    </>
  );
};

const CheckboxBlock = ({ data, current, setCurrent, id }) => {
  return (
    <div className="flex items-center my-1.5 md:my-1">
      <input
        type="checkbox"
        id={id ? data?.title : data}
        checked={
          id
            ? current?.includes(data?._id)
            : current?.includes(data.toLowerCase())
        }
        onChange={(e) => {
          if (id) {
            if (current?.includes(data?._id)) {
              let temp = current;
              temp = temp.filter((e) => e != data?._id);
              setCurrent(temp);
            } else {
              setCurrent([...current, data?._id]);
            }
          } else {
            if (current?.includes(data.toLowerCase())) {
              let temp = current;
              temp = temp.filter((e) => e != data?.toLowerCase());
              setCurrent(temp);
            } else {
              setCurrent([...current, data?.toLowerCase()]);
            }
          }
        }}
        className="h-5 md:h-4 w-5 md:w-4 rounded-md border-none bg-brown"
      />
      <label
        htmlFor={id ? data?.title : data}
        className="cursor-pointer md:text-base text-lg ml-2 text-gray-600"
      >
        {id ? data?.title : data}
      </label>
    </div>
  );
};

export default Products;
