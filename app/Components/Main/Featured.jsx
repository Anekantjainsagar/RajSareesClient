"use client";
import { salsa } from "@/app/Utils/font";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

import img1 from "@/app/Assets/featured/1 (1).png";
import img2 from "@/app/Assets/featured/1 (2).png";
import img3 from "@/app/Assets/featured/1 (3).png";
import img4 from "@/app/Assets/featured/1 (4).png";

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

const Featured = () => {
  return (
    <div>
      <div className="flex items-center justify-between text-grey">
        <div
          className={`${salsa.className} text-2xl md:text-3xl flex items-center font-semibold`}
        >
          Featured Products <FaArrowRight className="ml-2 md:ml-3 pt-1.5" />
        </div>
        <div className="flex items-center md:text-lg">
          View All <FaArrowRight className="ml-1 md:ml-2 pt-0.5 md:text-xl" />
        </div>
      </div>
      <div className="mt-4 hidden md:grid gap-x-6 grid-cols-4 pt-3">
        {[img2, img3, img4, img1].map((e, i) => {
          return <Block key={i} data={e} />;
        })}
      </div>
      <div className="md:hidden md:mt-0 mt-5">
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
          {[img2, img3, img4, img1].map((item, i) => (
            <SwiperSlide key={i}>
              <Block data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div className="flex text-grey flex-col items-center pb-10 md:py-2 cursor-pointer hover:scale-105 transition-all hover:shadow-lg shadow-brown rounded-lg">
      <Image src={data} alt="Img" className="w-9/12" />
      <h1 className="text-xl font-medium mt-2">Navvali Sarees</h1>
      <p>
        MRP <span className="line-through mx-2">₹ 1000</span>
        <span>₹ 799</span>
      </p>
      <button className="bg-brown text-white text-lg my-2 flex items-center justify-center py-1.5 w-9/12 rounded-full shadow-md shadow-gray-300">
        <AiOutlineShoppingCart size={25} className="mr-2" /> Add to Cart
      </button>
    </div>
  );
};

export default Featured;
