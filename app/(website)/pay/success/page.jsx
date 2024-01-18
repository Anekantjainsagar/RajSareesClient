"use client";
import React from "react";
import img from "@/app/Assets/success.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Success = () => {
  const history = useRouter();

  return (
    <div className="overflow-x-hidden py-10">
      <div className="bg-navyBlue w-full flex flex-col items-center justify-center text-grey">
        <Image src={img} alt={"img"} className="mobile:w-[70%] md:w-[25%]" />
        <h1 className="text-3xl md:text-4xl py-3 md:mt-0 mt-4">
          Payment Successful !
        </h1>
        <p className="mobile:w-[85%] md:w-[40%] text-center">
          Welcome to the community. We are shipping your Product, the soonest.
        </p>
        <button
          onClick={(e) => {
            history.push("/products");
          }}
          className="bg-[#4fae6f] font-semibold px-6 py-1.5 text-white rounded-lg mt-2 cursor-pointer"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Success;
