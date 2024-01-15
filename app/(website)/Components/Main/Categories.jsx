"use client";
import { salsa, sansation } from "@/app/Utils/font";
import React, { useContext } from "react";
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
import CategoryBlock from "./CategoryBlock";
import Context from "../../Context/Context";

const Categories = () => {
  const { categories } = useContext(Context);

  return (
    <div className="py-12 md:py-16 text-grey">
      <div className={`${salsa.className} flex items-center justify-between`}>
        <div className="h-[1px] bg-black w-[38vw] md:w-[36.5vw] rounded-full relative">
          <div className="h-[3px] w-[3px] rotate-45 absolute left-0 top-1/2 -translate-y-1/2 bg-black"></div>
        </div>
        <p className="text-2xl md:text-3xl text-center">Popular Categories</p>
        <div className="h-[1px] bg-black w-[38vw] md:w-[36.5vw] rounded-full relative">
          <div className="h-[3px] w-[3px] rotate-45 absolute right-0 top-1/2 -translate-y-1/2 bg-black"></div>
        </div>
      </div>
      <div
        className={`hidden md:grid grid-cols-4 gap-x-8 gap-y-8 mt-4 px-10 pt-3 ${sansation.className}`}
      >
        {categories.map((e, i) => {
          return <CategoryBlock key={i} data={e} />;
        })}
      </div>
      <div className="md:hidden pt-6">
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          autoplay={{
            interval: 1000,
            disableOnInteraction: true,
          }}
          cssMode={true}
        >
          {categories.map((item, i) => (
            <SwiperSlide key={i}>
              <CategoryBlock data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
