"use client";
import React, { useContext, useEffect } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import Context from "@/app/(website)/Context/Context";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { salsa, sansation } from "@/app/Utils/font";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

const Search = () => {
  const history = useRouter();
  const {
    categories,
    search,
    setSearch,
    showSearchBar,
    recent,
    updateRecentSearch,
    setShowSearchBar,
    setCategoryFilter,
  } = useContext(Context);

  useEffect(() => {
    if (showSearchBar === true) {
      setSearch("");
    }
  }, [showSearchBar]);

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSearchBar}
        onRequestClose={() => {
          setShowSearchBar(false);
        }}
        style={customStyles}
      >
        <div
          className={`border border-grey border-opacity-45 shadow-md shadow-gray-100 bg-[#EAEAEA] rounded-md px-3 py-3 w-[90vw] md:w-[40vw]`}
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
                history.push("/products");
              }
            }}
            autoFocus={true}
            className="w-full outline-none bg-white border border-opacity-45 border-grey rounded-md text-grey px-4 py-1"
          />
          <div className="px-3 bg-white py-1 mt-2 rounded-md">
            <p className="text-grey font-medium">Your Recent Searches</p>
            <div className="flex flex-col mt-1 px-1">
              {recent && (
                <p className="text-sm flex items-center cursor-pointer rounded-md mb-2">
                  <FaClockRotateLeft className="mr-2" /> {recent}
                </p>
              )}
            </div>
          </div>
          <div className="px-3 bg-white py-1 mt-2 rounded-md">
            <p className="text-grey font-medium">Popular Searches</p>
            <div className="flex items-center flex-wrap mt-2 px-1">
              {categories.map((e, i) => {
                return (
                  <p
                    onClick={(ev) => {
                      setCategoryFilter(e?._id);
                      history.push("/products");
                      setShowSearchBar(false);
                    }}
                    key={i}
                    className="text-sm cursor-pointer border border-grey px-3 py-0.5 rounded-md mr-2 mb-2"
                  >
                    {e?.title}
                  </p>
                );
              })}
            </div>
          </div>
          {/* <div className="md:hidden mt-2 bg-white rounded-md py-2">
            <Swiper
              slidesPerView={1}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              loop={true}
              autoplay={{
                interval: 1000,
                disableOnInteraction: true,
              }}
              cssMode={true}
            >
              {[
                { image: img8, title: "Sarees" },
                { image: img7, title: "Ethnic Wear" },
                { image: img6, title: "Party Wear" },
                { image: img5, title: "Cotton Saree" },
                { image: img4, title: "Georgette Saree" },
                { image: img3, title: "Rajputi Poshak" },
                { image: img2, title: "Organza Silk" },
                { image: img1, title: "Banarasi Saree" },
              ].map((item, i) => (
                <SwiperSlide key={i}>
                  <Block data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div className="flex flex-col w-[95%] mx-auto items-center relative cursor-pointer rounded-md transition-all hover:scale-105">
      <Image
        src={data?.image}
        alt="Img"
        className="w-full h-full object-cover object-center rounded-md transition-all"
      />
      <h1 className="text-2xl font-medium text-white absolute mt-0 pt-0 text-center bottom-16 md:bottom-10 left-1/2 -translate-x-1/2">
        {data?.title}
      </h1>
    </div>
  );
};

export default Search;
