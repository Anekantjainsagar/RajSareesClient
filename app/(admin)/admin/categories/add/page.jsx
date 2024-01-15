"use client";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import URL from "@/app/Utils/index";
import { useRouter } from "next/navigation";
import Context from "@/app/(website)/Context/Context";

const AddProduct = () => {
  const history = useRouter();
  const { getCategories } = useContext(Context);
  const [product, setProduct] = useState({
    name: "",
    desc: "",
  });
  const [image, setImage] = useState("");

  const saveProduct = () => {
    if (product?.name && image) {
      axios
        .post(`${URL}/category/add`, {
          ...product,
          title: product?.name,
          image: image,
        })
        .then((res) => {
          if (res.status === 200) {
            getCategories();
            history.push("/admin/category");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please fill the necessary details");
    }
  };

  return (
    <div className="h-[81vh] overflow-x-hidden overflow-y-auto">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 cursor-pointer gradientHover w-fit text-newBlue">
        Add New Category
      </h1>
      <div className="px-3 mb-5 flex items-start justify-between">
        <div className="w-9/12 mr-5">
          <input
            type="text"
            value={product?.name}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
            className="px-3 border w-full outline-none py-1 rounded-md mb-4"
            placeholder="Enter Category Name *"
          />
          <textarea
            rows="5"
            className="outline-none mb-4 border w-full px-3 rounded-md py-2"
            placeholder="Enter the description"
            value={product?.desc}
            onChange={(e) => {
              setProduct({ ...product, desc: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="w-3/12 ">
          {image ? (
            <Image
              width={100}
              height={100}
              src={image}
              className="object-cover w-full object-center rounded-md mb-3"
            />
          ) : (
            <div className="min-h-[50vh] bg-gray-200 mb-3 rounded-md"></div>
          )}
          <input
            type="file"
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
                  setImage(res.url);
                })
                .catch((err) => {});
            }}
          />
        </div>
      </div>
      <button
        onClick={saveProduct}
        className="bg-gray-700 text-white w-full py-1.5 rounded-md"
      >
        Save Category
      </button>
    </div>
  );
};

export default AddProduct;
