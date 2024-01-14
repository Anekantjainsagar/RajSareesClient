"use client";
import React, { useState } from "react";
import { sansation } from "@/app/Utils/font";
import product from "@/app/Assets/product.png";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Cart = () => {
  return (
    <div
      className={`py-10 px-[4vw] flex md:flex-row flex-col text-grey items-start ${sansation.className}`}
    >
      <div className="md:w-9/12 md:mr-2.5 h-[50vh] md:h-[72vh] overflow-y-auto">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <div className="w-full md:mt-0 mt-5 md:w-3/12 border shadow-md shadow-gray-100 rounded-md px-3 py-1">
        <h1 className="font-semibold text-xl border-b pb-1 mb-1">
          Price Details
        </h1>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Subtotal</p>
          <p>₹799</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Discount</p>
          <p>₹99</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Tax</p>
          <p>₹99</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Delivery Charges</p>
          <p>Free Delivery</p>
        </div>
        <div className="flex font-semibold border-t border-b py-0.5 justify-between my-1 text-lg items-center">
          <p>Grand Total</p>
          <p>₹700</p>
        </div>
        <button className="w-full text-center bg-brown text-white mt-2 py-1 font-semibold rounded-md mb-1">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border mb-3 flex mr-3 items-stretch shadow-md shadow-gray-100 rounded-md px-2 md:px-3 py-2 md:py-3">
      <Image
        alt="Product"
        src={product}
        className="w-3/12 md:w-2/12 rounded-md h-[15vh] md:h-[20vh] object-cover object-top"
      />
      <div className="ml-3 w-full flex flex-col justify-between">
        <div>
          <div className="flex items-center w-full justify-between">
            <p className="text-lg md:text-[22px]">Cotton Silk Saree</p>
            <p className="md:text-xl font-medium">MRP ₹799</p>
          </div>
          <p className="text-gray-500 md:text-base text-xs ml-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, unde?
          </p>
          <div className="flex items-center ml-1 mt-2">
            <AiOutlineMinus
              onClick={(e) => {
                if (quantity == 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                }
              }}
              className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1.5"
            />
            <p className="text-xl mx-4 font-semibold">{quantity}</p>
            <AiOutlinePlus
              onClick={(e) => {
                setQuantity(quantity + 1);
              }}
              className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1.5"
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <p className="cursor-pointer ml-5">Remove</p>
          <p className="cursor-pointer ml-5">Add to Wishlist</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
