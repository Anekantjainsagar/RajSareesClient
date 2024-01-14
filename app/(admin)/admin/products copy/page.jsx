"use client";
import Context from "@/Context/Context";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import URL from "@/Utils/urls";
import axios from "axios";
import Link from "next/link";

const Products = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { productM } = useContext(Context);
  const history = useRouter();

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/user/login");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[81vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold">
            All Products ({productM?.productData?.length})
          </p>
          <div>
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
            >
              {[
                "Sort By",
                "Newest",
                "Oldest",
                "Price Low to High",
                "Price High to Low",
                "Ascending",
                "Descending",
              ].map((e, i) => {
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
          {productM?.productData
            ?.sort((a, b) => {
              if (sortStore === "Price High to Low") {
                let fa = a.price,
                  fb = b.price;

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              } else if (sortStore == "Price Low to High") {
                let fa = a.price,
                  fb = b.price;

                if (fa < fb) {
                  return -1;
                }
                if (fa > fb) {
                  return 1;
                }
                return 0;
              } else if (sortStore === "Descending") {
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
              } else if (sortStore === "Oldest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fb - fa;
              } else if (sortStore === "Newest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fa - fb;
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
  const { productM } = useContext(Context);

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex items-center">
        <Image
          src={data?.images[0]}
          width={100}
          height={100}
          alt="Image"
          className="w-[5vw] object-cover object-center"
        />
        <div className="py-1 ml-3">
          <p className="text-black font-bold">{data?.name}</p>
          <div className="flex items-center">
            <p className="mt-0 text-newBlue text-xs font-bold">
              INR {data?.price}
            </p>
            <p className="mt-0 ml-2 text-gray-700 line-through text-xs font-bold">
              INR {data?.discountPrice}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Link
          href={`https://consciousleap.co/conscious-store/${data?._id}`}
          target="_blank"
        >
          <AiOutlineEye
            className="text-oceanGreen bg-lightOceanGreen p-2 rounded-full hover:text-white hover:bg-oceanGreen transition-all mr-3"
            size={35}
          />
        </Link>
        <AiOutlineEdit
          className="text-blue-500 bg-blue-50 p-2 rounded-full hover:text-white hover:bg-blue-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            history.push(`/admin/products/${data?._id}`);
          }}
        />
        <AiOutlineDelete
          className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all mr-3"
          size={35}
          onClick={(e) => {
            axios.post(`${URL}/product/delete/${data?._id}`).then((res) => {
              if (res.status === 200 && res.data.deletedCount > 0) {
                productM?.getProducts();
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
