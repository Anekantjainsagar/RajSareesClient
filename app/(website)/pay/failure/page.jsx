"use client";
import React from "react";
import img from "@/app/Assets/failure.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Failure = () => {
  const history = useRouter();

  return (
    <div className="overflow-x-hidden py-10">
      <div className="bg-navyBlue w-full flex flex-col items-center justify-center text-grey">
        <Image src={img} alt={"image"} className="mobile:w-full md:w-[30%]" />
        <h1 className="text-4xl py-2 md:mt-2 mobile:mt-3">OOPS !!</h1>
        <p>Something Went Wrong</p>
        <p>Your Payment was not Completed !!</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            history("/cart");
          }}
          className="bg-red-800 text-white font-semibold px-6 py-1.5 rounded-lg mt-2 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Failure;
