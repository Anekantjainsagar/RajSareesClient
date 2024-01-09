import { salsa } from "@/app/Utils/font";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";

import img1 from "@/app/Assets/featured/1 (1).png";
import img2 from "@/app/Assets/featured/1 (2).png";
import img3 from "@/app/Assets/featured/1 (3).png";
import img4 from "@/app/Assets/featured/1 (4).png";

const Featured = () => {
  return (
    <div>
      <div className="flex items-center justify-between text-grey">
        <div className={`${salsa.className} text-3xl flex items-center`}>
          Featured Products <FaArrowRight className="ml-3 pt-1" />
        </div>
        <div className="flex items-center text-lg">
          View All <FaArrowRight className="ml-2 pt-0.5" size={23} />
        </div>
      </div>
      <div className="mt-4 grid gap-x-6 grid-cols-4 pt-3">
        {[img2, img3, img4, img1].map((e, i) => {
          return <Block key={i} data={e} />;
        })}
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div className="flex text-grey flex-col items-center py-2 cursor-pointer hover:scale-105 transition-all hover:shadow-lg shadow-brown rounded-lg">
      <Image src={data} alt="Img" />
      <h1 className="text-xl font-medium mt-2">Navvali Sarees</h1>
      <p>
        MRP <span className="line-through mx-2">₹ 1000</span>
        <span>₹ 799</span>
      </p>
      <button className="bg-brown text-white text-lg my-2 flex items-center justify-center py-1.5 w-9/12 rounded-full shadow-md shadow-gray-300">
        <AiOutlineShoppingCart size={25} className="mr-2" /> Add to Cart
      </button>
    </div>
  );
};

export default Featured;
