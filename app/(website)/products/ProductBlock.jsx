import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import product from "@/app/Assets/product.png";

const ProductBlock = ({ isWishlist }) => {
  const history = useRouter();

  return (
    <div
      onClick={(e) => {
        history.push("/products/1");
      }}
      className="px-2 rounded-md relative py-2 border cursor-pointer shadow-md shadow-gray-200 transition-all hover:scale-95"
    >
      <div
        className={`${
          isWishlist
            ? "block absolute top-5 md:top-3 right-5 md:right-3 hover:scale-110 transition-all"
            : "hidden"
        }`}
      >
        <AiOutlineDelete className="text-4xl rounded-full text-brown hover:text-white hover:bg-brown transition-all p-1.5 bg-gray-100" />
      </div>
      <Image
        src={product}
        className="h-[40vh] rounded-md object-cover object-top"
        alt="Product"
      />
      <div className="px-1 mt-1">
        <h1 className="text-gray-600 text-lg">Cotton Sarees</h1>
        <p className="text-grey text-xl font-medium">
          {" "}
          MRP <span className="line-through mx-2">₹ 1000</span>
          <span>₹ 799</span>
        </p>
        <button className="bg-brown text-white mt-2 flex items-center justify-center py-1.5 w-full rounded-md hover:scale-105 transition-all">
          <AiOutlineShoppingCart className="mr-2 text-xl" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductBlock;
