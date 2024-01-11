"use client";
import React, { useContext } from "react";
import Context from "../Context/Context";
import { FaClockRotateLeft } from "react-icons/fa6";

const Search = () => {
  const {
    search,
    setSearch,
    showSearchBar,
    recent,
    updateRecentSearch,
    setShowSearchBar,
  } = useContext(Context);

  return (
    (showSearchBar || search?.length > 0) && (
      <div
        className={`absolute top-9 md:top-12 border border-grey border-opacity-45 shadow-md shadow-gray-100 left-1/2 -translate-x-1/2 bg-[#EAEAEA] rounded-md px-2 py-1.5 w-[70vw] md:w-[24vw]`}
      >
        <input
          type={"text"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={"Search by Product name..."}
          onKeyDown={(e) => {
            if (e?.code === "Enter") {
              localStorage.setItem("recent", search);
              updateRecentSearch();
              setShowSearchBar(!showSearchBar);
              setSearch("");
            }
          }}
          autoFocus={true}
          className="w-full outline-none bg-white border border-opacity-45 border-grey rounded-md text-grey px-4 py-1"
        />
        <div className="px-3 bg-white py-1 mt-2 rounded-md">
          <p className="text-grey font-medium text-sm">Your Recent Searches</p>
          <div className="flex flex-col mt-1 px-1">
            {recent && (
              <p className="text-sm flex items-center cursor-pointer rounded-md mb-2">
                <FaClockRotateLeft className="mr-2" /> {recent}
              </p>
            )}
          </div>
        </div>
        <div className="px-3 bg-white py-1 mt-2 rounded-md">
          <p className="text-grey font-medium text-sm">Popular Searches</p>
          <div className="flex items-center flex-wrap mt-2 px-1">
            {[
              "Saree",
              "Cotton Saree",
              "Ethnic Saree",
              "Wedding saree",
              "Preety Saree",
              "Pink Saree",
            ].map((e) => {
              return (
                <p
                  key={e}
                  className="text-xs cursor-pointer border border-grey px-3 py-0.5 rounded-md mr-2 mb-2"
                >
                  {e}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Search;
