"use client";
import React, { useContext } from "react";
import ProductBlock from "../products/ProductBlock";
import { sansation } from "@/app/Utils/font";
import MightLike from "../products/MightLike";
import Context from "../Context/Context";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  const { login } = useContext(Context);
  const history = useRouter();

  return (
    <div className={`py-10 px-[4vw] ${sansation.className} text-grey`}>
      <div className="flex items-start md:items-center justify-between mb-2 md:mb-4 -mt-1">
        <h1 className="text-xl md:text-3xl font-semibolds md:font-medium">
          My Wishlist
        </h1>
      </div>
      {login?.wishlist?.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-x-6 gap-y-6 px-2">
          {login?.wishlist?.map((e, i) => {
            return <ProductBlock isWishlist={true} data={e} key={i} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xl">No Products Added to Wishlist</p>
          <button
            onClick={(e) => {
              history.push("/products");
            }}
            className="bg-brown text-white px-5 py-1 rounded-md mt-2 text-lg shadow-md shadow-gray-500"
          >
            Go to Products
          </button>
        </div>
      )}

      <MightLike />
    </div>
  );
};

export default Wishlist;
