"use client";

import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
// import image from "@/(main)/Assets/dashboard-user-image.jpeg";
import Context from "@/app/(website)/Context/Context";

const Orders = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { ordersData } = useContext(Context);
  const history = useRouter();

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[81vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold">All Orders ({ordersData?.length})</p>
          <div>
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
            >
              {["Sort By", "Newest", "Oldest"].map((e, i) => {
                return (
                  <option value={e} key={i}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="px-2 pt-2">
          {ordersData
            ?.sort((a, b) => {
              if (sortStore === "Oldest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fa - fb;
              } else if (sortStore === "Newest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fb - fa;
              }
              return 0;
            })
            .map((e, i) => {
              return <Product data={e} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Product = ({ data }) => {
  const { getOrders } = useContext(Context);

  return (
    <div className="rounded-md grid grid-cols-3 items-center mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex items-center">
        <div className="py-1 ml-3">
          <p className="font-bold text-[16px]">{data?.user?.name}</p>
          <div className="flex items-center">
            <p className="mt-0 text-newBlue text-xs font-bold">
              {new Date(data?.date).toString()?.slice(0, 21)}
            </p>
          </div>
          <p className="mt-0 text-xs font-bold">
            <span className="text-newBlue mr-1">Payment mode:</span>
            {data?.mode}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start ml-[5vw]">
        <p className="py-0 font-semibold text-newBlue mb-0">Products :</p>
        {data?.products?.map((e, i) => {
          return (
            <p key={i} className="mt-0 font-semibold">
              {i + 1}. {e?.name}
            </p>
          );
        })}
      </div>
      <div className="font-semibold text-center w-10/12">
        <span className="text-newBlue mr-1 text-base">Address:</span>
        {data?.address?.address}, {data?.address?.city}, {data?.address?.state},{" "}
        {data?.address?.country} ({data?.address?.phone})
      </div>
    </div>
  );
};

export default Orders;
