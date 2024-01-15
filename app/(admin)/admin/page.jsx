"use client";
import Context from "@/app/(website)/Context/Context";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

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
import CategoryBlock from "@/app/(website)/Components/Main/CategoryBlock";
import { sansation } from "@/app/Utils/font";

const AdminPage = () => {
  const { products, categories } = useContext(Context);
  const history = useRouter();

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/");
    }
  }, []);

  return (
    <div className={`${sansation.className} h-[88vh] overflow-y-auto bg-gray-100 p-4`}>
      <div className="bg-white border mb-4 rounded-md pt-4 shadow-md shadow-gray-200">
        <p className="text-black font-bold px-4 border-b pb-2">
          All Products ({products?.length})
        </p>
        <div className="px-2 pt-4">
          <Swiper
            slidesPerView={6}
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
            {products?.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <Product data={e} />
                </SwiperSlide>
              );
            })}
            {products?.map((e, i) => {
              return (
                <SwiperSlide key={i}>
                  <Product data={e} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="bg-white border rounded-md pt-4 shadow-md shadow-gray-200">
        <p className="text-black font-bold px-4 border-b pb-2">
          All Categories ({categories?.length})
        </p>
        <div className="px-2 py-4">
          <Swiper
            slidesPerView={5}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            loop={true}
            autoplay={{
              interval: 2000,
              disableOnInteraction: true,
            }}
            cssMode={true}
          >
            {categories?.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="w-11/12 mx-auto">
                  <CategoryBlock data={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const Product = ({ data }) => {
  return (
    <div className="rounded-md border mb-10 cursor-pointer shadow-sm shadow-gray-200 p-2 w-11/12 mx-auto">
      <Image
        src={data?.images[0]}
        width={100}
        height={100}
        alt="Image"
        className="w-full h-[34vh] rounded-md object-cover object-center"
      />
      <div className="py-1">
        <p className="text-black font-bold">{data?.name}</p>
        <div className="flex items-center">
          <p className="mt-0 text-newBlue text-xs font-semibold">
            INR {data?.price}
          </p>
          <p className="mt-0 ml-2 text-gray-700 line-through text-xs">
            INR {data?.discountPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
