"use client";
import React from "react";
import ProductBlock from "../products/ProductBlock";
import { sansation } from "../Utils/font";
import MightLike from "../products/MightLike";

const Wishlist = () => {
  return (
    <div className={`py-10 px-[4vw] ${sansation.className} text-grey`}>
      <div className="flex items-start md:items-center justify-between mb-2 md:mb-4 -mt-1">
        <h1 className="text-xl md:text-3xl font-semibold md:font-medium">
          My Wishlist
        </h1>
      </div>
      <div className="grid md:grid-cols-4 gap-x-6 gap-y-6 px-2">
        <ProductBlock isWishlist={true} />
        <ProductBlock isWishlist={true} />
        <ProductBlock isWishlist={true} />
        <ProductBlock isWishlist={true} />
        <ProductBlock isWishlist={true} />
        <ProductBlock isWishlist={true} />
      </div>
      <MightLike />
    </div>
  );
};

export default Wishlist;
