import React from "react";
import { salsa, sansation } from "../Utils/font";

const Footer = () => {
  const data = [
    {
      name: "Quick Links",
      routes: [{ name: "Woman" }, { name: "Collection" }, { name: "Virtual" }],
    },
    {
      name: "Policies",
      routes: [
        { name: "Terms & Conditions" },
        { name: "Shipping" },
        { name: "Return" },
      ],
    },
    {
      name: "My Account",
      routes: [
        { name: "Login" },
        { name: "Shopping Bag" },
        { name: "Wishlist" },
      ],
    },
  ];

  return (
    <div className="px-[3vw] bg-orange pb-7">
      <div className="bg-gradient-to-r from-[#e9ab2600] via-newYellow to-[#e9ab2600] h-[2px] w-full mb-6"></div>
      <div className="flex items-start justify-between">
        <div className="w-[17vw]">
          <h1 className={`${salsa.className} pb-3 text-3xl text-brown`}>
            Raj Enterprises
          </h1>
          <p className={`text-grey ${sansation.className} text-lg`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
        </div>
        {data?.map((e, i) => {
          return <Block data={e} key={i} />;
        })}
      </div>
      <div className="h-[1px] bg-[#B0A4A4] my-5 opacity-60"></div>
      <div
        className={`flex items-center justify-between text-grey ${sansation.className} text-lg`}
      >
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div className="w-[17vw]">
      <h1 className={`${salsa.className} pb-3 text-3xl text-brown`}>
        {data?.name}
      </h1>
      {data?.routes?.map((e, i) => {
        return (
          <p
            key={i}
            className={`text-grey cursor-pointer border-b border-b-transparent hover:border-b-grey transition-all mb-2 w-fit ${sansation.className} text-lg`}
          >
            {e?.name}
          </p>
        );
      })}
    </div>
  );
};

export default Footer;
