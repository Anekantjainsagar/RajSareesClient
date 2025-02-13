import { sansation } from "@/app/Utils/font";
import React from "react";

const Shipping = () => {
  return (
    <div className={`py-10 px-[4vw] text-grey ${sansation.className}`}>
      <h1 className="text-brown text-2xl font-bold">
        Shipping & Delivery Policy
      </h1>
      <div className="px-2 md:px-4 mt-2">
        <p className="mb-2">
          For International buyers, orders are shipped and delivered through
          registered international courier companies and/or International speed
          post only. For domestic buyers, orders are shipped through registered
          domestic courier companies and /or speed post only. Orders are shipped
          within 3-5 Days days or as per the delivery date agreed at the time of
          order confirmation and delivering of the shipment subject to Courier
          Company / post office norms.
        </p>
        <p className="mb-2">
          SAROJ SURIN RATHORE is not liable for any delay in delivery by the
          courier company / postal authorities and only guarantees to hand over
          the consignment to the courier company or postal authorities within
          3-5 Days days from the date of the order and payment or as per the
          delivery date agreed at the time of order confirmation. Delivery of
          all orders will be to the address provided by the buyer. Delivery of
          our services will be confirmed on your mail ID as specified during
          registration. For any issues in utilizing our services you may contact
          our helpdesk on 8778107414 or sarojsurin1973@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Shipping;
