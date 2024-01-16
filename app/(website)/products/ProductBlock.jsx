import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineShoppingCart } from "react-icons/ai";
import Context from "../Context/Context";

const ProductBlock = ({ isWishlist, data }) => {
  const history = useRouter();
  const { removeFromWishlist, addToCart, cart, removeFromCart } =
    useContext(Context);

  return (
    <div
      onClick={(e) => {
        let title = data?.name?.replaceAll(" ", "-")?.toLowerCase();
        history.push(`/products/${title}`);
      }}
      className="px-2 rounded-md relative py-2 border cursor-pointer shadow-md shadow-gray-200 transition-all hover:scale-95"
    >
      <div
        className={`${
          isWishlist
            ? "block absolute top-5 md:top-3 right-5 md:right-3 hover:scale-110 transition-all"
            : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          removeFromWishlist(data?._id);
        }}
      >
        <AiOutlineDelete className="text-4xl rounded-full text-brown hover:text-white hover:bg-brown transition-all p-1.5 bg-gray-100" />
      </div>
      <Image
        src={data?.images[0]}
        width={1000}
        height={1000}
        className="h-[50vh] rounded-md object-cover object-top"
        alt="Product"
      />
      <div className="px-1 mt-1">
        <h1 className="text-gray-600 text-lg">
          {data?.name?.slice(0, 23) + (data?.name?.length > 23 ? "..." : "")}
        </h1>
        <p className="text-grey text-xl font-medium">
          {" "}
          MRP <span className="line-through mx-2">₹ {data?.discountPrice}</span>
          <span>₹ {data?.price}</span>
        </p>
        {cart?.find((e) => e?._id === data?._id) ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(data);
            }}
            className="bg-white text-brown mt-2 flex items-center border border-brown justify-center py-1.5 w-full rounded-md hover:scale-105 transition-all"
          >
            <AiOutlineDelete className="mr-2 text-xl" /> Remove from Cart
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(data);
            }}
            className="bg-brown text-white mt-2 flex items-center border border-white justify-center py-1.5 w-full rounded-md hover:scale-105 transition-all"
          >
            <AiOutlineShoppingCart className="mr-2 text-xl" /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductBlock;
