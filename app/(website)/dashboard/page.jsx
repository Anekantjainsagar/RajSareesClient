"use client";
import React, { useContext, useEffect, useState } from "react";
import { salsa } from "@/app/Utils/font";
import Image from "next/image";
import Icon from "./Add";
import Context from "../Context/Context";
import axios from "axios";
import URL from "@/app/Utils";
import { deleteCookie, getCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const history = useRouter();
  const { login, getUser } = useContext(Context);
  const [data, setData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    setData({
      name: login?.name,
      email: login?.email,
      phone: login?.phone,
      gender: login?.gender,
      address: login?.address,
      city: login?.city,
      state: login?.state,
      pincode: login?.pincode,
      image: login?.image,
    });
  }, [login]);

  const updateProfile = () => {
    if (data?.name && data?.email && data?.phone) {
      axios
        .post(`${URL}/user/update-user`, {
          ...data,
          token: getCookie("token"),
        })
        .then((res) => {
          if (res.status == 200 && res.data.modifiedCount > 0) {
            getUser();
            toast.success("Profile Updated Successfully");
          } else {
            toast.error("Profile Already Updated");
          }
        });
    } else {
      toast.error("Please enter all the details");
    }
  };

  const onLogout = () => {
    deleteCookie("token");
    history.push("/");
    setData({
      image: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    getUser();
  };

  return (
    <div className="bg-orange py-10 px-[4vw]">
      <Toaster />
      <div className="flex w-11/12 md:mt-5 mt-5 md:w-5/12 mx-auto items-center flex-col justify-center">
        <p
          className={`text-2xl text-center w-full mb-5 ${salsa.className} text-brown font-semibold`}
        >
          Account Details
        </p>
        <div className="w-[50vw] md:w-[8vw] relative">
          <Image
            src={data?.image}
            width={1000}
            height={1000}
            alt="User profile"
            className="w-full h-[50vw] md:h-[8vw] object-cover object-center rounded-full"
          />
        </div>
        <div className="relative mt-3">
          <input
            type="file"
            id="fileInput"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              formData.append("upload_preset", "upload_photo");
              formData.append("cloud_name", "dfk09gblw");

              fetch("https://api.Cloudinary.com/v1_1/dfk09gblw/image/upload", {
                method: "POST",
                body: formData,
              })
                .then((res) => res.json())
                .then((res) => {
                  setData({ ...data, image: res.url });
                })
                .catch((err) => {});
            }}
          />
          <label
            className="relative font-medium cursor-pointer text-brown px-4 py-2"
            htmlFor="fileInput" // Use the same ID as the file input
          >
            <Icon />
            Add Picture
          </label>
        </div>
        <Input
          value={data?.name}
          onchange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
          placeholder={"Enter your Name *"}
        />
        <Input
          value={data?.email}
          onchange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          placeholder={"Enter your Email *"}
        />
        <Input
          value={data?.phone}
          onchange={(e) => {
            setData({ ...data, phone: e.target.value });
          }}
          placeholder={"Enter your Phone *"}
        />
        <Input
          value={data?.gender}
          onchange={(e) => {
            setData({ ...data, gender: e.target.value });
          }}
          placeholder={"Enter your Gender"}
        />
        <Input
          value={data?.address}
          onchange={(e) => {
            setData({ ...data, address: e.target.value });
          }}
          placeholder={"Enter your Address Line 1"}
        />
        <Input
          value={data?.city}
          onchange={(e) => {
            setData({ ...data, city: e.target.value });
          }}
          placeholder={"Enter your City"}
        />
        <Input
          value={data?.state}
          onchange={(e) => {
            setData({ ...data, state: e.target.value });
          }}
          placeholder={"Enter your State"}
        />
        <Input
          value={data?.pincode}
          onchange={(e) => {
            setData({ ...data, pincode: e.target.value });
          }}
          placeholder={"Enter your Pin Code"}
        />
        <button
          onClick={updateProfile}
          className="bg-brown text-white mt-5 w-full py-1.5 font-semibold rounded-md"
        >
          Save Details
        </button>
        <button
          onClick={onLogout}
          className="text-brown w-full text-center mt-2 border border-brown flex items-center justify-center py-1.5 font-semibold rounded-md"
        >
          <CiLogout className="font-bold mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

const Input = ({ value, onchange, placeholder }) => {
  return (
    <input
      type={
        placeholder?.toLowerCase().includes("phone") ||
        placeholder?.toLowerCase()?.includes("pin code")
          ? "number"
          : "text"
      }
      value={value}
      onChange={onchange}
      placeholder={placeholder}
      className="w-full outline-none bg-transparent border-b border-b-brown text-brown placeholder:text-[#8824377d] px-4 py-1 mt-3 rounded-sm"
    />
  );
};

export default Dashboard;
