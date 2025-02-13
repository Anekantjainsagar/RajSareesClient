"use client";
import React, { useContext } from "react";
import { salsa, sansation } from "@/app/Utils/font";
import Context from "@/app/(website)/Context/Context";
import { useRouter } from "next/navigation";

const Footer = () => {
  const data = [
    {
      name: "Policies",
      routes: [
        { name: "Cancellation & Refund Policy", route: "/refund" },
        { name: "Shipping & Delivery Policy", route: "/shipping" },
        { name: "Terms & Conditions", route: "/tnc" },
        { name: "Privacy Policy", route: "/privacy-policy" },
        { name: "Contact Us", route: "/contact-us" },
      ],
    },
    {
      name: "Quick Links",
      routes: [{ name: "Woman" }, { name: "Collection" }, { name: "Virtual" }],
    },
    {
      name: "My Account",
      routes: [
        { name: "Login" },
        { name: "Shopping Bag", route: "/cart" },
        { name: "Wishlist", route: "/wishlist" },
      ],
    },
  ];

  return (
    <div className="px-[3vw] bg-orange pb-4 md:pb-7">
      <div className="bg-gradient-to-r from-[#e9ab2600] via-newYellow to-[#e9ab2600] h-[2px] w-full mb-6"></div>
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between">
        <div className="w-[80vw] md:w-[17vw] flex flex-col items-center md:items-start">
          <h1 className={`${salsa.className} pb-3 text-3xl text-brown`}>
            Raj Enterprises
          </h1>
          <p
            className={`text-grey ${sansation.className} md:text-start text-center text-lg`}
          >
            Discover elegance at Raj Sarees Enterprise. Explore a wide variety
            of high-quality sarees for every occasion. Elevate your
            style effortlessly
          </p>
        </div>
        {data?.map((e, i) => {
          return <Block data={e} key={i} />;
        })}
      </div>
      <div className="h-[1px] bg-[#B0A4A4] my-3 md:my-5 opacity-60"></div>
      <div
        className={`flex items-start justify-between text-grey ${sansation.className} md:text-lg`}
      >
        <p>Gandhinagar, Neyveli, Tamil Nadu, PIN: 607801</p>
        <p>copyright 2024 @rajsareesenterprises all right reserved</p>
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  const history = useRouter();
  const { setLoginModalOpen } = useContext(Context);

  return (
    <div className="md:w-[17vw] flex flex-col md:mt-0 mt-5 items-center md:items-start">
      <h1 className={`${salsa.className} pb-2 md:pb-3 text-3xl text-brown`}>
        {data?.name}
      </h1>
      {data?.routes?.map((e, i) => {
        return (
          <p
            key={i}
            onClick={(el) => {
              if (e?.name == "Login") {
                setLoginModalOpen(true);
              }
              if (e?.route) {
                history.push(e?.route);
              }
            }}
            className={`text-grey cursor-pointer border-b border-b-transparent hover:border-b-grey transition-all mb-1 md:mb-2 w-fit ${sansation.className} text-lg`}
          >
            {e?.name}
          </p>
        );
      })}
    </div>
  );
};

export default Footer;
