"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import URL from "@/app/Utils/index";
import { useRouter } from "next/navigation";
import Context from "@/app/(website)/Context/Context";

const AddProduct = ({ params }) => {
  const { id } = params;
  const history = useRouter();
  const { categories, getProducts, products } = useContext(Context);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPrice: "",
    quantity: "",
    description: "",
    category_id: "",
  });
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const saveProduct = () => {
    if (product?.name && product?.price && product?.discountPrice && image1) {
      axios
        .post(`${URL}/product/update/${id}`, {
          ...product,
          images: [image1, image2, image3, image4, image5],
        })
        .then((res) => {
          if (res.status === 200) {
            getProducts();
            history.push("/admin/products");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please fill the necessary details");
    }
  };

  useEffect(() => {
    const product = products?.find((e) => e?._id == id);
    console.log(product);
    setProduct({
      name: product?.name,
      price: product?.price,
      discountPrice: product?.discountPrice,
      quantity: product?.quantity,
      description: product?.description,
      category_id: product?.category_id?._id,
    });
    setImage1(product?.images[0]);
    setImage2(product?.images[1]);
    setImage3(product?.images[2]);
    setImage4(product?.images[3]);
    setImage5(product?.images[4]);
  }, [id, products]);

  return (
    <div className="h-[81vh] overflow-y-auto overflow-x-hidden pr-3">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 cursor-pointer gradientHover w-fit text-newBlue">
        Update Product
      </h1>
      <div className="px-3 flex items-start">
        <div className="mr-4 w-11/12">
          <input
            type="text"
            value={product?.name}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
            className="px-3 border w-full outline-none py-1 rounded-md mb-4"
            placeholder="Enter Product Name *"
          />
          <select
            value={product?.category_id}
            onChange={(e) => {
              setProduct({ ...product, category_id: e.target.value });
            }}
            className="px-3 border w-full outline-none py-1 rounded-md mb-4"
          >
            {categories?.map((e) => {
              return (
                <option key={e?._id} value={e?._id}>
                  {e?.title}
                </option>
              );
            })}
          </select>
          <div className="mb-4 grid grid-cols-3 items-center gap-x-4">
            <input
              type="number"
              value={product?.discountPrice}
              onChange={(e) => {
                setProduct({ ...product, discountPrice: e.target.value });
              }}
              className="px-3 border w-full outline-none py-1 rounded-md"
              placeholder="Enter Original Price"
            />{" "}
            <input
              type="number"
              value={product?.price}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              className="px-3 border w-full outline-none py-1 rounded-md"
              placeholder="Enter Price After Discount"
            />
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={product?.quantity}
                className="px-3 border outline-none py-1 w-7/12 rounded-md"
                placeholder="Quantity"
                onChange={(e) => {
                  setProduct({ ...product, quantity: e.target.value });
                }}
              />
              <p>
                Discount:{" "}
                <span
                  className={`${
                    parseInt(
                      ((product?.discountPrice - product?.price) /
                        product?.discountPrice) *
                        100
                    ) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {product?.price && product?.discountPrice
                    ? parseInt(
                        ((product?.discountPrice - product?.price) /
                          product?.discountPrice) *
                          100
                      )
                    : 0}
                  %
                </span>
              </p>
            </div>
          </div>
          <textarea
            rows="5"
            className="outline-none mb-4 border w-full px-3 rounded-md py-2"
            placeholder="Enter the Description"
            value={product?.description}
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
          ></textarea>
        </div>
        <ImageInput image={image1} setImage={setImage1} />
      </div>
      <div className="grid grid-cols-4 gap-x-3 mt-5 px-2">
        <ImageInput image={image2} setImage={setImage2} />
        <ImageInput image={image3} setImage={setImage3} />
        <ImageInput image={image4} setImage={setImage4} />
        <ImageInput image={image5} setImage={setImage5} />
      </div>
      <button
        onClick={saveProduct}
        className="bg-gray-700 mt-5 text-white w-full py-1.5 rounded-md"
      >
        Update Product
      </button>
    </div>
  );
};

const ImageInput = ({ image, setImage }) => {
  return (
    <div>
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
  );
};

export default AddProduct;
