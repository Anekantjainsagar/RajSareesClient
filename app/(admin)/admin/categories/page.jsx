"use client";
import Context from "@/app/(website)/Context/Context";
import URL from "@/app/Utils/index";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

const Products = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { categories } = useContext(Context);
  const history = useRouter();

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[81vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold">All Categories ({categories?.length})</p>
          <div>
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
            >
              {["Sort By", "Ascending", "Descending"].map((e, i) => {
                return (
                  <option value={e} key={i}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="px-2 pt-2">
          {categories
            ?.sort((a, b) => {
              if (sortStore === "Descending") {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              } else if (sortStore == "Ascending") {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              }
              return 0;
            })
            .map((e, i) => {
              return <Product data={e} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Product = ({ data }) => {
  const history = useRouter();
  const { getCategories } = useContext(Context);

  return (
    <div className="rounded-md flex items-center border justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex items-center">
        <Image
          src={data?.image}
          width={100}
          height={100}
          alt="Image"
          className="w-[5vw] rounded-md object-cover object-center"
        />
        <div className="py-1 ml-3">
          <p className="text-black font-bold text-xl">{data?.title}</p>
          <p className="mt-0 text-gray-500 text-sm font-bold">{data?.desc}</p>
        </div>
      </div>
      <div className="flex items-center">
        <AiOutlineEdit
          className="text-blue-500 bg-blue-50 p-2 rounded-full hover:text-white hover:bg-blue-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            history.push(`/admin/categories/${data?._id}`);
          }}
        />
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            axios.post(`${URL}/category/delete/${data?._id}`).then((res) => {
              if (res.status === 200) {
                getCategories();
                toast.success("Deleted successfully");
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default Products;
