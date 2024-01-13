"use client";
import { salsa, sansation } from "@/app/Utils/font";
import React from "react";

import img1 from "@/app/Assets/categories/category (1).png";
import img2 from "@/app/Assets/categories/category (2).png";
import img3 from "@/app/Assets/categories/category (3).png";
import img4 from "@/app/Assets/categories/category (4).png";
import img5 from "@/app/Assets/categories/category (5).png";
import img6 from "@/app/Assets/categories/category (6).png";
import img7 from "@/app/Assets/categories/category (7).png";
import img8 from "@/app/Assets/categories/category (8).png";

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

const Categories = () => {
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
        {[
          { image: img8, title: "Sarees" },
          { image: img7, title: "Ethnic Wear" },
          { image: img6, title: "Party Wear" },
          { image: img5, title: "Cotton Saree" },
          { image: img4, title: "Georgette Saree" },
          { image: img3, title: "Rajputi Poshak" },
          { image: img2, title: "Organza Silk" },
          { image: img1, title: "Banarasi Saree" },
        ].map((e, i) => {
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
              <CategoryBlock data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
