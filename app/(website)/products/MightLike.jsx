"use client";
import React, { useContext } from "react";
import { sansation } from "@/app/Utils/font";
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
import CategoryBlock from "../Components/Main/CategoryBlock";
import Context from "../Context/Context";

const MightLike = () => {
  const { categories } = useContext(Context);

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
        {categories?.slice(0, 4)?.map((e, i) => {
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
          {categories?.slice(0, 4)?.map((item, i) => (
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
