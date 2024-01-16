import { sansation } from "@/app/Utils/font";
import React from "react";

const ContactUs = () => {
  return (
    <div className={`py-10 px-[4vw] text-grey ${sansation.className}`}>
      <h1 className="text-brown text-2xl font-bold">Contact Us</h1>
      <div className="px-2 md:px-4 mt-1">
        <p className="">You may contact us using the information below:</p>
        {[
          { title: "Merchant Legal entity name", value: "SAROJ SURIN RATHORE" },
          {
            title: "Registered Address",
            value:
              "Shop no 2. Church road Street, near Deen Medicals, Gandhinagar, Neyveli, Tamil Nadu, PIN: 607801",
          },
          {
            title: "Oprational Address",
            value:
              "Shop no 2. Church road Street, near Deen Medicals, Gandhinagar, Neyveli, Tamil Nadu, PIN: 607801",
          },
          {
            title: "Telephone No",
            value: "8778107414",
          },
          {
            title: "E-Mail ID",
            value: "sarojsurin1973@gmail.co",
          },
        ].map((e, i) => {
          return (
            <p key={i}>
              <span className="text-brown mr-1 font-medium">{e?.title}:</span>
              {e?.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ContactUs;
