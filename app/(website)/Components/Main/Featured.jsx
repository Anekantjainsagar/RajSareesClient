"use client";
import { salsa } from "@/app/Utils/font";
import Image from "next/image";
import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";

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
import { useRouter } from "next/navigation";
import Context from "../../Context/Context";

const Featured = () => {
  const { products } = useContext(Context);
  const history = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between text-grey">
        <div
          className={`${salsa.className} text-2xl md:text-3xl flex items-center font-semibold`}
        >
          Featured Products <FaArrowRight className="ml-2 md:ml-3 pt-1.5" />
        </div>
        <div
          onClick={(e) => {
            history.push("/products");
          }}
          className="flex items-center md:text-lg cursor-pointer"
        >
          View All <FaArrowRight className="ml-1 md:ml-2 pt-0.5 md:text-xl" />
        </div>
      </div>
      <div className="mt-4 px-6 hidden md:grid gap-x-6 grid-cols-4 pt-3">
        {products
          ?.filter((e) => {
            return e?.featured;
          })
          .map((e, i) => {
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
          {products
            ?.filter((e) => {
              return e?.filter;
            })
            .map((item, i) => (
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
  const history = useRouter();
  const { cart, removeFromCart, addToCart } = useContext(Context);

  return (
    <div
      onClick={(e) => {
        let title = data?.name?.replaceAll(" ", "-")?.toLowerCase();
        history.push(`/products/${title}`);
      }}
      className="flex text-grey flex-col items-center pb-10 md:py-2 cursor-pointer hover:scale-105 transition-all hover:shadow-lg shadow-brown rounded-lg"
    >
      <Image
        src={data?.images[0]}
        width={1000}
        height={1000}
        alt="Img"
        className="w-9/12 h-[47vh] object-cover object-center rounded-md"
      />
      <h1 className="text-xl font-medium mt-2 text-center text-clip	">
        {data?.name?.slice(0, 23) + (data?.name?.length > 23 ? "..." : "")}
      </h1>
      <p>
        MRP <span className="line-through mx-2">₹ {data?.discountPrice}</span>
        <span>₹ {data?.price}</span>
      </p>
      {cart?.find((e) => e?._id === data?._id) ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeFromCart(data);
          }}
          className="bg-white text-brown my-2 flex items-center border border-brown justify-center py-1.5 w-9/12 rounded-full shadow-md shadow-gray-300 hover:scale-105 transition-all"
        >
          <AiOutlineDelete className="mr-2 text-xl" /> Remove from Cart
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(data);
          }}
          className="bg-brown text-white my-2 flex items-center border border-white justify-center py-1.5 w-9/12 rounded-full shadow-md shadow-gray-300 hover:scale-105 transition-all"
        >
          <AiOutlineShoppingCart className="mr-2 text-xl" /> Add to Cart
        </button>
      )}
    </div>
  );
};

export default Featured;
