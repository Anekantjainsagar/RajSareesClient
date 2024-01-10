import Image from "next/image";
import React from "react";
import hero from "@/app/Assets/hero.png";
import { sansation } from "./Utils/font";
import Featured from "./Components/Main/Featured";
import Categories from "./Components/Main/Categories";
import FOllowus from "./Components/Main/FollowUs";

const App = () => {
  return (
    <div className="bg-orange px-[4vw] pb-10">
      <div
        className={`flex items-start md:items-center md:flex-row flex-col-reverse justify-between py-10 ${sansation.className}`}
      >
        <div>
          <p className="text-4xl md:mt-0 mt-4 md:text-6xl text-grey">
            Find Your Perfect
            <br />
            <span className="text-brown">Blend</span> of Our <br />
            <span className="text-brown">Traditional</span> and
            <br /> Modern <span className="text-brown">Fashion</span>
          </p>
          <button className="bg-brown text-xl text-white px-10 py-2 rounded-xl mt-5 shadow-md shadow-gray-400 font-semibold">
            Shop Now
          </button>
        </div>
        <Image
          src={hero}
          alt="Hero image"
          className="md:w-[50vw] h-[30vh] md:h-[70vh] object-cover object-center rounded-xl"
        />
      </div>
      <Featured />
      <Categories />
      <FOllowus />
    </div>
  );
};

export default App;
