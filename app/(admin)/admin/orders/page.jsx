"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Context from "@/app/(website)/Context/Context";
import OrderBlock from "@/app/(website)/dashboard/orders/OrderBlock";

const Orders = () => {
  const [sortStore, setSortStore] = useState("Sort By");
  const { ordersData, allOrders } = useContext(Context);
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
          <p className="font-bold">All Orders ({allOrders?.length})</p>
          <div>
            <select
              value={sortStore}
              onChange={(e) => {
                setSortStore(e.target.value);
              }}
              className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
            >
              {["Sort By", "Newest", "Oldest"].map((e, i) => {
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
          {allOrders
            ?.sort((a, b) => {
              if (sortStore === "Oldest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fa - fb;
              } else if (sortStore === "Newest") {
                let fa = new Date(a.date),
                  fb = new Date(b.date);

                return fb - fa;
              }
              return 0;
            })
            .map((e, i) => {
              return <OrderBlock admin={true} data={e} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
