"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
// import image from "@/(main)/Assets/dashboard-user-image.jpeg";
import toast, { Toaster } from "react-hot-toast";
import URL from "@/app/Utils";

const Users = () => {
  const history = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (!getCookie("admin_token")) {
      history.push("/");
    }
  }, []);

  const getUsers = () => {
    axios
      .get(`${URL}/admin/get-users`)
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    usersData && (
      <div className="bg-gray-100">
        <Toaster />
        <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[81vh] shadow-md shadow-gray-200">
          <div className="text-black flex items-center justify-between px-4 border-b pb-2">
            <p className="font-bold">All Users ({usersData?.length})</p>
            <div>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
                className="w-full md:w-[13vw] rounded-sm text-darkGrey text-sm border px-2 py-2 outline-none"
              >
                <option className="py-1" value="Sort By">
                  Sort By
                </option>
                <option className="py-1" value="Ascending">
                  Ascending
                </option>
                <option className="py-1" value="Descending">
                  Descending
                </option>
              </select>
            </div>
          </div>
          <div className="px-2 pt-2">
            {usersData
              ?.sort((a, b) => {
                if (sort == "Descending") {
                  let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return 1;
                  }
                  if (fa > fb) {
                    return -1;
                  }
                  return 0;
                } else if (sort == "Ascending") {
                  let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                  if (fa < fb) {
                    return -1;
                  }
                  if (fa > fb) {
                    return 1;
                  }
                  return 0;
                }
                return 0;
              })
              .map((e, i) => {
                return <Product data={e} key={i} getUsers={getUsers} />;
              })}
          </div>
        </div>
      </div>
    )
  );
};

const Product = ({ data, getUsers }) => {
  return (
    <div className="rounded-md grid grid-cols-3 items-center mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2">
      <div className="flex items-center">
        <Image
          width={1000}
          height={1000}
          src={data?.image}
          className="w-[5vw] h-[5vw] object-cover object-center rounded-full"
          alt="Image"
        />
        <div className="py-1 ml-3">
          <p className="font-bold text-lg">{data?.name}</p>
          <div className="flex items-center">
            <p className="mt-0 text-newBlue text-sm font-medium">{data?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="py-0 text-newBlue">{data?.phone}</h1>
      </div>
      <p className="text-center">
        {data?.address}, {data?.city}, {data?.state}, India {data?.pincode}
      </p>
    </div>
  );
};

export default Users;
