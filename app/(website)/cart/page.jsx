"use client";
import React, { useContext, useEffect, useState } from "react";
import { sansation } from "@/app/Utils/font";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Context from "../Context/Context";
import URL from "@/app/Utils";
import { cashfreeSandbox } from "cashfree-pg-sdk-javascript";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { cart, login } = useContext(Context);
  const [total, setTotal] = useState(0);
  const history = useRouter();

  useEffect(() => {
    if (cart?.length > 0) {
      setTotal(
        cart
          ?.map((e) => e?.price * e?.quantity)
          ?.reduce((prev, next) => prev + next)
      );
    }
  }, [cart]);

  const checkout = () => {
    if (
      typeof document != undefined &&
      login?.city &&
      login?.state &&
      login?.address
    ) {
      axios
        .post(`${URL}/order/place`, {
          products: JSON.parse(localStorage.getItem("cart")),
          amount: parseFloat((total * 18) / 100 + total).toFixed(1),
          user_id: login?._id,
        })
        .then((res) => {
          // let cashfree = new cashfreeSandbox.Cashfree(
          //   res.data?.payment_session_id
          //   // "session_FK1QzlogVldka_0NpCLP8zd1bbM6gPHcNRWd1KNUuVuRPg_H3qg-mC9DsoCNw1d67K-zjVkW0M84V7L7nO8_gbAOgUG-BcEkwqiP954HY0wO"
          // );
          // cashfree.redirect();
          // const cfCheckout = cashfree.elements();
          // cfCheckout.elements({
          //   type: "upi-collect",
          // });
          // cfCheckout.pay("upi-collect");
        })
        .catch((err) => {});
    } else {
      toast.error("Please add address before proceeding to payment");
      setTimeout(() => {
        history.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <div
      className={`py-10 px-[4vw] flex md:flex-row flex-col text-grey items-start ${sansation.className}`}
    >
      <Toaster />
      <div className="md:w-9/12 md:mr-2.5 h-[50vh] md:h-[72vh] overflow-y-auto">
        {cart?.map((e, i) => {
          return <Product key={i} data={e} />;
        })}
      </div>
      <div className="w-full md:mt-0 mt-5 md:w-3/12 border shadow-md shadow-gray-100 rounded-md px-3 py-1">
        <h1 className="font-semibold text-xl border-b pb-1 mb-1">
          Price Details
        </h1>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Subtotal</p>
          <p>₹{total}</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Discount</p>
          <p>₹0</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Tax (18%)</p>
          <p>₹{parseFloat((total * 18) / 100).toFixed(1)}</p>
        </div>
        <div className="flex justify-between my-1 text-lg items-center">
          <p>Delivery Charges</p>
          <p>Free Delivery</p>
        </div>
        <div className="flex font-semibold border-t border-b py-0.5 justify-between my-1 text-lg items-center">
          <p>Grand Total</p>
          <p>₹{parseFloat((total * 18) / 100 + total).toFixed(1)}</p>
        </div>
        <button
          onClick={checkout}
          className="w-full text-center bg-brown text-white mt-2 py-1.5 font-semibold rounded-md mb-1"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const Product = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, login, removeFromWishlist, removeFromCart, setCart } =
    useContext(Context);

  useEffect(() => {
    setQuantity(data?.quantity);
  }, [data]);

  const updateQuantity = (num) => {
    let allData = JSON.parse(localStorage.getItem("cart"));
    let temp = allData?.find((e) => e?._id == data?._id);
    temp.quantity = num;
    allData = allData?.filter((e) => e?._id != data?._id);
    localStorage.setItem("cart", JSON.stringify([...allData, temp]));
    setCart([...allData, temp]);
  };

  return (
    <div className="border mb-3 flex mr-3 items-stretch shadow-md shadow-gray-100 rounded-md px-2 md:px-3 py-2 md:py-3">
      <Image
        alt="Product"
        width={1000}
        height={1000}
        src={data?.images[0]}
        className="w-3/12 md:w-2/12 rounded-md h-[20vh] md:h-[25vh] object-cover object-top"
      />
      <div className="ml-3 w-full flex flex-col justify-between">
        <div>
          <div className="flex items-center w-full justify-between">
            <p className="text-lg md:text-[22px]">{data?.name}</p>
            <p className="md:text-xl font-medium">
              MRP ₹{data?.price * quantity}
            </p>
          </div>
          <p className="text-gray-500 md:text-base text-xs ml-1">
            {data?.description?.slice(0, 80) +
              (data?.description?.length > 80 ? "..." : "")}
          </p>
          <div className="flex items-center ml-1 mt-2">
            <AiOutlineMinus
              onClick={(e) => {
                if (quantity == 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                  updateQuantity(quantity - 1);
                }
              }}
              className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1.5"
            />
            <p className="text-xl mx-4 font-semibold">{quantity}</p>
            <AiOutlinePlus
              onClick={(e) => {
                setQuantity(quantity + 1);
                updateQuantity(quantity + 1);
              }}
              className="text-2xl cursor-pointer bg-gray-200 rounded-full p-1.5"
            />
          </div>
        </div>
        <div className="flex md:text-base text-sm items-center justify-end">
          <p
            onClick={(e) => {
              removeFromCart(data);
            }}
            className="cursor-pointer ml-5 hover:scale-110 hover:font-bold transition-all"
          >
            Remove
          </p>
          {login?.wishlist?.find((e) => e?._id === data?._id)?._id ? (
            <p
              className="cursor-pointer ml-5 hover:scale-110 hover:font-bold transition-all"
              onClick={(e) => {
                removeFromWishlist(data?._id);
              }}
            >
              Remove from Wishlist
            </p>
          ) : (
            <p
              className="cursor-pointer ml-5 hover:scale-110 hover:font-bold transition-all"
              onClick={(e) => {
                addToWishlist(data?._id);
              }}
            >
              Add to Wishlist
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
