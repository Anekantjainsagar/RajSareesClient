"use client";
import Image from "next/image";
import React from "react";
import img from "@/app/Assets/product.png";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaAngleDoubleRight } from "react-icons/fa";
import { salsa, sansation } from "@/app/Utils/font";
import MightLike from "../MightLike";

const Product = () => {
  return (
    <div
      className={`bg-orange py-8 px-[4vw] md:px-[8vw] ${sansation.className}`}
    >
      <div className="flex md:flex-row md:justify-between flex-col">
        <div className="flex md:flex-row flex-col-reverse md:w-4/12 md:ml-3">
          <div className="md:w-3/12 mr-4 md:px-0 px-2 flex flex-row md:h-fit h-[18vw] md:my-0 my-3 w-full md:flex-col">
            <Image
              src={img}
              alt="Image"
              className="md:w-full w-[13vw] md:mr-0 mr-3 h-full object-cover object-top border border-brown cursor-pointer md:mb-4 rounded-md"
            />
            <Image
              src={img}
              alt="Image"
              className="md:w-full w-[13vw] md:mr-0 mr-3 h-full object-cover object-top cursor-pointer opacity-70 rounded-md"
            />
          </div>
          <Image
            src={img}
            alt="Image"
            className="md:w-9/12 w-full rounded-xl md:rounded-md"
          />
        </div>
        <div className="md:ml-5 mt-2 text-grey md:px-0 px-2 md:w-8/12">
          <div className="flex w-full justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">
                Turquoise Blue Organza Saree
              </p>
              <p className="text-xl my-1 font-medium">
                MRP <span className="line-through mx-2">₹ 1000</span>
                <span>₹ 799</span>
              </p>
            </div>
            <div className="flex items-center mt-2">
              <AiOutlineHeart className="text-3xl ml-3 cursor-pointer" />
              <CiShare2 className="text-3xl ml-3 cursor-pointer" />
            </div>
          </div>
          <p className="font-semibold mt-3 text-2xl">Product Details</p>
          <p className="md:w-10/12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            labore ratione cupiditate quos magnam illum qui iste adipisci illo
            explicabo, eaque itaque provident in quo nam nihil accusantium eos
            laboriosam reiciendis. Omnis quas doloribus eveniet fuga debitis
            perspiciatis repellendus veritatis provident repellat quasi dolor
            ipsa saepe, non nesciunt nisi libero!
          </p>
          <div className="flex md:flex-row flex-col items-center font-medium mt-5">
            <button className="border-2 border-brown md:mb-0 mb-3 justify-center md:mr-3 flex items-center md:w-fit w-full px-7 rounded-md text-xl text-brown py-1">
              <AiOutlineShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="border-2 border-white bg-brown flex justify-center items-center md:w-fit w-full px-7 rounded-md text-xl text-white py-1">
              <FaAngleDoubleRight className="mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <MightLike />
    </div>
  );
};

export default Product;
