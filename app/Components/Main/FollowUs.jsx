import { salsa, sansation } from "@/app/Utils/font";
import React from "react";

import img1 from "@/app/Assets/instagram/instagram (1).png";
import img2 from "@/app/Assets/instagram/instagram (2).png";
import img3 from "@/app/Assets/instagram/instagram (3).png";
import img4 from "@/app/Assets/instagram/instagram (4).png";
import Image from "next/image";

const FOllowus = () => {
  return (
    <div className="py-6">
      <div className={`${salsa.className} text-brown`}>
        <p className="text-3xl">Follow us on Instagram</p>
      </div>
      <div
        className={`grid grid-cols-4 gap-x-8 gap-y-4 mt-4 px-5 pt-3 ${sansation.className}`}
      >
        {[img1, img2, img3, img4].map((e, i) => {
          return <Block key={i} data={e} />;
        })}
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div className="flex flex-col items-center h-[35vh] cursor-pointer rounded-md transition-all hover:scale-105">
      <Image
        src={data}
        alt="Img"
        width={10000}
        height={10000}
        className="w-full transition-all h-full rounded-md object-cover object-center"
      />
    </div>
  );
};

export default FOllowus;
