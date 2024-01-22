"use client";
import { sansation } from "@/app/Utils/font";
import React, { useContext, useEffect, useState } from "react";
import image from "@/app/Assets/product.png";
import Image from "next/image";
import Context from "../../Context/Context";
import { useRouter } from "next/navigation";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import OrderBlock from "./OrderBlock";

const Orders = () => {
  const history = useRouter();
  const { myOrders, getMyOrders } = useContext(Context);

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className={`py-10 px-[4vw] ${sansation.className}`}>
      <h1 className="text-xl md:text-3xl text-brown font-bold">My Orders</h1>
      <div className="h-[70vh] md:h-[65vh] overflow-y-auto p-1 md:p-2">
        {myOrders.map((e, i) => {
          return <OrderBlock data={e} key={i} />;
        })}
        {myOrders?.length == 0 ? (
          <div className="text-xl flex flex-col text-center items-center pt-5">
            You&apos;ve no Orders
            <button
              onClick={(e) => {
                history.push("/products");
              }}
              className="bg-brown text-lg text-white px-6 w-fit py-1 mt-1 rounded-lg shadow-md shadow-gray-200"
            >
              Explore Products
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Orders;
