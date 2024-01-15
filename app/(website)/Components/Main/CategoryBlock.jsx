import { sansation } from "@/app/Utils/font";
import Image from "next/image";
import React from "react";

const CategoryBlock = ({ data }) => {
  return (
    <div
      className={`${sansation.className} flex flex-col md:w-full w-9/12 md:pb-0 pb-10 mx-auto items-center relative cursor-pointer rounded-md transition-all hover:scale-105`}
    >
      <Image
        src={data?.image}
        width={1000}
        height={1000}
        alt="Img"
        className="w-full h-full object-cover object-center rounded-md transition-all"
      />
      <h1 className="text-2xl font-medium text-white absolute mt-0 pt-0 text-center bottom-16 md:bottom-10 left-1/2 -translate-x-1/2">
        {data?.title}
      </h1>
    </div>
  );
};

export default CategoryBlock;
