"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const OrderBlock = ({ data, admin }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="border p-2 md:p-3 text-grey cursor-pointer rounded-lg mb-4 shadow-md shadow-gray-200 md:mr-3">
      <div
        onClick={(e) => {
          setHidden(!hidden);
        }}
        className="flex md:text-lg justify-between items-center"
      >
        {admin ? (
          <p className="font-medium text-base">
            {data?.user_id?.name}{" "}
            <span className="text-sm">(Rs. {data?.amount})</span>
            <span
              className={`ml-2 ${
                data?.status === "NewOrder" ? "text-green-500" : "text-red-500"
              }`}
            >
              {data?.status === "NewOrder"
                ? "Payment Success"
                : "Payment Failed"}
            </span>
          </p>
        ) : (
          <p className="font-medium">
            {new Date(data?.date).toString()?.slice(4, 21)}
          </p>
        )}
        {!hidden ? <AiOutlineRight /> : <AiOutlineDown />}
      </div>
      <div className="px-0.5 md:px-3">
        {hidden && (
          <>
            {data?.products?.map((e, i) => {
              return (
                <Link
                  key={i}
                  href={`https://rajsareesenterprises.com/products/${e?.name
                    ?.replaceAll(" ", "-")
                    ?.toLowerCase()}`}
                  target="_blank"
                >
                  <div className="border p-2 md:p-3 flex items-start text-grey cursor-pointer rounded-lg mt-2.5">
                    <div className="flex items-start w-full">
                      <div className="w-[35%] md:w-[11%]">
                        <Image
                          src={e?.images[0]}
                          width={10000}
                          height={10000}
                          alt="Image"
                          className="rounded-lg w-full h-full md:h-[12vw] object-cover object-top"
                        />
                      </div>
                      <div className="ml-3 w-[65%] md:w-[89%]">
                        <div className="flex items-start justify-between w-full">
                          <h1 className="md:text-xl w-8/12 md:w-11/12 md:font-semibold text-brown">
                            {e?.name}
                          </h1>
                          <p className="text-xs md:text-lg mt-1 w-4/12 md:w-1/12 text-end">
                            ₹{e?.price}
                          </p>
                        </div>
                        <p className="md:text-base text-sm">
                          Quantity: {e?.quantity}
                        </p>
                        <p className="md:text-base text-sm">
                          Total Price:{" "}
                          {parseInt(
                            e?.quantity * e?.price +
                              e?.quantity * e?.price * 0.18
                          )}{" "}
                          <span className="text-xs">
                            (including taxes and delivery charges)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="flex justify-end">
              <p className="text-end mt-1.5 md:text-base text-xs w-full md:w-4/12">
                <span className="text-brown font-medium">Address: </span>
                {data?.phone}, {data?.user_id?.address}, {data?.user_id?.city},{" "}
                {data?.user_id?.state}, India {data?.user_id?.pincode}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderBlock;
