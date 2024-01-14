"use client";
import React from "react";
import { sansation } from "@/app/Utils/font";
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
import Image from "next/image";
import CategoryBlock from "../Components/Main/CategoryBlock";

const MightLike = () => {
  return (
    <div className="py-12 md:py-16 text-grey">
      <div
        className={`${sansation.className} flex items-center justify-between`}
      >
        <p className="text-2xl md:text-3xl text-center">You might also like</p>
      </div>
      <div
        className={`hidden md:grid grid-cols-4 gap-x-8 gap-y-8 mt-4 px-10 pt-3 ${sansation.className}`}
      >
        {[
          { image: img8, title: "Sarees" },
          { image: img7, title: "Ethnic Wear" },
          { image: img6, title: "Party Wear" },
          { image: img5, title: "Cotton Saree" },
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

export default MightLike;
