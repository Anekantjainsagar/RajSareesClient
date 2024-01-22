"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import img from "@/app/Assets/product.png";
import {
  AiFillHeart,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaAngleDoubleRight } from "react-icons/fa";
import { sansation } from "@/app/Utils/font";
import MightLike from "../MightLike";
import Context from "../../Context/Context";

const Product = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState();
  const {
    products,
    addToWishlist,
    login,
    removeFromWishlist,
    cart,
    removeFromCart,
    addToCart,
  } = useContext(Context);
  const [image, setImage] = useState();

  useEffect(() => {
    let temp = products?.find((e) => {
      return e?.name?.replaceAll(" ", "-")?.toLowerCase() === id;
    });
    setImage(temp?.images[0]);
    setData(temp);
  }, [id, products]);

  return (
    <div
      className={`bg-orange py-8 px-[4vw] md:px-[8vw] ${sansation.className}`}
    >
      <div className="flex md:flex-row md:justify-between flex-col">
        <div className="flex md:flex-row flex-col-reverse md:w-4/12 md:ml-3">
          <div className="md:w-3/12 mr-4 md:px-0 px-2 flex flex-row md:h-[30vw] md:overflow-y-auto h-[18vw] md:my-0 my-3 w-full md:flex-col">
            {data?.images?.map((e, i) => {
              return (
                e && (
                  <Image
                    width={1000}
                    height={1000}
                    onClick={(ev) => {
                      setImage(e);
                    }}
                    key={i}
                    src={e}
                    alt="Image"
                    className={`md:w-full w-[13vw] h-full md:h-[18vh] mb-3 md:mr-0 mr-3 ${
                      image == e ? "border border-brown" : "opacity-60"
                    } object-cover object-top cursor-pointer rounded-md`}
                  />
                )
              );
            })}
          </div>
          <Image
            src={image}
            width={1000}
            height={1000}
            alt="Image"
            className="md:w-9/12 w-full rounded-xl md:rounded-md"
          />
        </div>
        <div className="md:ml-5 mt-2 text-grey md:px-0 px-2 md:w-8/12">
          <div className="flex w-full justify-between items-start">
            <div>
              <p className="text-2xl font-semibold">{data?.name}</p>
              <p className="text-xl my-1 font-medium">
                MRP{" "}
                <span className="line-through mx-2">
                  ₹ {data?.discountPrice}
                </span>
                <span>₹ {data?.price}</span>
              </p>
            </div>
            <div className="flex items-center mt-2">
              {login?.wishlist?.find((e) => e?._id == data?._id) ? (
                <AiFillHeart
                  onClick={(e) => {
                    removeFromWishlist(data?._id);
                  }}
                  className="text-3xl text-brown ml-3 cursor-pointer"
                />
              ) : (
                <AiOutlineHeart
                  onClick={(e) => {
                    addToWishlist(data?._id);
                  }}
                  className="text-3xl ml-3 text-brown cursor-pointer"
                />
              )}
              <CiShare2 className="text-3xl ml-3 cursor-pointer" />
            </div>
          </div>
          <p className="font-semibold mt-3 text-2xl">Product Details</p>
          <p className="md:w-10/12 text-lg md:text-base">{data?.description}</p>
          <div className="flex md:flex-row flex-col items-center font-medium mt-5">
            {cart?.find((e) => e?._id === data?._id) ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(data);
                }}
                className="border-2 bg-brown border-white md:mb-0 mb-3 justify-center md:mr-3 flex items-center md:w-fit w-full px-7 rounded-md text-xl text-white py-1"
              >
                <AiOutlineDelete className="mr-2 text-xl" /> Remove from Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(data);
                }}
                className="border-2 border-brown md:mb-0 mb-3 justify-center md:mr-3 flex items-center md:w-fit w-full px-7 rounded-md text-xl text-brown py-1"
              >
                <AiOutlineShoppingCart className="mr-2 text-xl" /> Add to Cart
              </button>
            )}
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
