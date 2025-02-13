"use client";
import Context from "@/app/(website)/Context/Context";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import URL from "@/app/Utils/index";
import axios from "axios";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";

const Products = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { products, } = useContext(Context);
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
          <p className="font-bold">All Products ({products?.length})</p>
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
                "Featured",
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
          {products
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
              } else if (sortStore === "Featured") {
                return b?.featured - a?.featured;
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
  const { getProducts } = useContext(Context);

  return (
    <div className="rounded-md flex border items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex items-stretch h-full">
        <Image
          src={data?.images[0]}
          width={100}
          height={100}
          alt="Image"
          className="w-[6vw] object-cover rounded-md object-center"
        />
        <div className="py-4 ml-3 flex flex-col items-start justify-between">
          <div>
            <p className="text-black text-lg font-bold">{data?.name}</p>
            <div className="flex text-base items-center">
              <p className="mt-0 text-newBlue font-medium">INR {data?.price}</p>
              <p className="mt-0 ml-2 text-gray-700 line-through font-medium">
                INR {data?.discountPrice}
              </p>
            </div>
          </div>
          <p className="">{data?.category_id?.title}</p>
        </div>
      </div>
      <div className="flex items-center">
        {/* <Link
          href={`https://consciousleap.co/conscious-store/${data?._id}`}
          target="_blank"
        >
          <AiOutlineEye
            className="text-oceanGreen bg-lightOceanGreen p-2 rounded-full hover:text-white hover:bg-oceanGreen transition-all mr-3"
            size={35}
          />
        </Link> */}
        {data?.featured ? (
          <MdOutlineStar
            className="text-yellow-500 bg-yellow-50 p-2 rounded-full hover:text-white hover:bg-yellow-500 transition-all mr-3"
            size={35}
            onClick={(e) => {
              axios
                .post(`${URL}/product/remove-featured/${data?._id}`)
                .then((res) => {
                  if (res.status == 200) {
                    getProducts();
                    toast.success("Product removed from featured successfully");
                  }
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            }}
          />
        ) : (
          <MdOutlineStarBorder
            className="text-yellow-500 bg-yellow-50 p-2 rounded-full hover:text-white hover:bg-yellow-500 transition-all mr-3"
            size={35}
            onClick={(e) => {
              axios
                .post(`${URL}/product/featured/${data?._id}`)
                .then((res) => {
                  if (res.status == 200) {
                    getProducts();
                    toast.success("Product added to featured successfully");
                  } else {
                    toast.error("Please remove some items from featured");
                  }
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            }}
          />
        )}
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
              if (res.status === 200) {
                getProducts();
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
