"use client";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { Player } from "@lottiefiles/react-lottie-player";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import URL from "@/app/Utils";
import Context from "../../Context/Context";

const PayCheck = ({ params }) => {
  const history = useRouter();
  const { setCart } = useContext(Context);
  const { id } = params;
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${URL}/order/get/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res?.data?._id) {
          setOrderDetails(res.data);
          axios
            .post(`${URL}/order/payment`, {
              amount: res?.data?.amount,
              order_id: id,
            })
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem("cart", JSON.stringify([]));
                setCart([]);
                history.push("/pay/success");
              } else if (res.status === 203) {
                history.push("/pay/failure");
              }
            })
            .catch((err) => {
              toast.error("Internal server error");
            });
        } else {
          history.push("/cart");
        }
      })
      .catch((err) => {
        toast.error("Internal server error");
      });
  }, []);

  return (
    <div className="overflow-x-hidden py-14">
      <Toaster />
      <div className="w-full flex flex-col items-center justify-center -mt-[3.5vw] text-grey">
        <div className="mobile:w-[50%] md:w-[20%] mx-auto">
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"
            className="player"
            loop
            autoplay
            speed={10}
          />
        </div>
        <h1 className="text-2xl text-brown md:text-4xl py-3 mt-1 font-bold">
          Your Order is Processing!
        </h1>
        <div className="flex items-center justify-between mobile:w-[80%] md:w-[25%]">
          <p>Amount Paid </p>
          <p className="flex items-center">
            <BsCurrencyRupee />
            {orderDetails?.amount} /-
          </p>
        </div>
        <button
          onClick={(e) => {
            history.push("/");
          }}
          className="bg-brown text-white px-6 py-1.5 rounded-lg mt-4 md:mt-4 cursor-pointer"
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default PayCheck;
