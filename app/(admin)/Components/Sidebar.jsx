"use client";
import React, { useState } from "react";
import logo from "@/app/Assets/logo.png";
import Image from "next/image";
import { RiDashboardLine } from "react-icons/ri";
import {
  CiDeliveryTruck,
  CiLogout,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { FaBlogger, FaCircleNotch, FaQuestion, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { deleteCookie } from "cookies-next";
import { MdOutlineCategory, MdOutlineEmail } from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();
  const history = useRouter();
  const data = [
    {
      name: "Dashboard",
      icon: <RiDashboardLine size={20} className="mr-2 pb-0.5" />,
      route: "/admin",
    },
    {
      name: "Products",
      icon: <CiShoppingCart size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Products",
          route: "/admin/products",
        },
        {
          name: "Add New Product",
          route: "/admin/products/add",
        },
      ],
    },
    {
      name: "Categories",
      icon: <MdOutlineCategory size={20} className="mr-2 pb-0.5" />,
      sub: [
        {
          name: "All Categories",
          route: "/admin/categories",
        },
        {
          name: "Add New Category",
          route: "/admin/categories/add",
        },
      ],
    },
    {
      name: "Orders",
      icon: <CiDeliveryTruck size={20} className="mr-2 pb-0.5" />,
      route: "/admin/orders",
    },
    {
      name: "Users",
      icon: <CiUser size={20} className="mr-2 pb-0.5" />,
      route: "/admin/users",
    },
  ];

  return (
    <div className="w-[16vw] h-[100vh] bg-[#141423] flex flex-col items-center px-2 py-2">
      <h1 className="text-white text-2xl font-bold my-2">Admin Panel</h1>
      <div className="w-full mt-2">
        {data?.map((e, i) => {
          return <NavItem e={e} key={i} />;
        })}
        <div
          onClick={(event) => {
            deleteCookie("admin_token");
            history.push("/");
          }}
          className={`font-bold hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
            pathname == "/logout" ? "text-white bg-gray-700" : "text-gray-400"
          }`}
        >
          <div className="items-center flex">
            <CiLogout size={20} className="mr-2 pb-0.5" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ e }) => {
  const history = useRouter();
  const pathname = usePathname();
  const [showBottom, setShowBottom] = useState(false);

  return (
    <>
      <div
        onClick={(event) => {
          if (e?.route) {
            history.push(e?.route);
          }
          setShowBottom(!showBottom);
        }}
        className={`font-bold hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-2 mb-0.5 cursor-pointer flex justify-between items-center ${
          pathname == e?.route ? "text-white bg-gray-700" : "text-gray-400"
        }`}
      >
        <div className="items-center flex">
          {e?.icon}
          {e?.name}
        </div>
        {e?.sub?.length > 0 && !showBottom && (
          <div className="">
            <AiOutlineRight />
          </div>
        )}
        {e?.sub?.length > 0 && showBottom && (
          <div className="">
            <AiOutlineDown />
          </div>
        )}
      </div>
      {e?.sub?.length > 0 &&
        showBottom &&
        e?.sub?.map((e, i) => {
          return <SubNavItem data={e} key={i} />;
        })}
    </>
  );
};

const SubNavItem = ({ data }) => {
  const pathname = usePathname();
  const history = useRouter();

  return (
    <div
      onClick={(e) => {
        if (data?.route) {
          history.push(data?.route);
        }
      }}
      className={`text-gray-400 font-bold hover:text-white transition-all py-2 hover:bg-gray-700 rounded-lg px-4 mb-0.5 cursor-pointer flex justify-between items-center pl-8 ${
        pathname == data?.route ? "text-white bg-gray-700" : "text-gray-400"
      }`}
    >
      <div className="items-center flex">
        <FaCircleNotch size={10} className="mr-2" />
        {data?.name}
      </div>
    </div>
  );
};

export default Sidebar;
