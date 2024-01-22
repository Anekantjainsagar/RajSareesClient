"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import URL from "@/app/Utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const getChartOptions = () => {
  return {
    scales: {
      x: {
        ticks: {
          color: "#413F3F", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#413F3F", // Y-axis label color
          callback: function (value) {
            // Display only numeric and positive values on the Y-axis
            if (Number.isInteger(value) && value >= 0) {
              return value;
            }
          },
        },
      },
    },
    ticks: {
      precision: 0,
    },
    plugins: {
      legend: {
        // display: false, // Set the dataset label display to false
        labels: {
          color: "#413F3F", // Set the label color here (if you have other labels, not dataset label)
        },
      },
    },
  };
};

const Admin = () => {
  const [orderReport, setOrderReport] = useState();
  const [revenueReport, setRevenueReport] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [getUsersReport, setGetUsersReport] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/order/get-order-report`)
      .then((response) => {
        setOrderReport(response.data);
      })
      .catch((err) => {});
    axios
      .get(`${URL}/order/get-revenue`)
      .then((response) => {
        setRevenueReport(response.data.report);
        setTotalRevenue(response.data.total);
      })
      .catch((err) => {});
    axios
      .get(`${URL}/order/get-users-report`)
      .then((res) => {
        setGetUsersReport(res.data);
      })
      .catch((err) => {});
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: [...revenueReport],
        backgroundColor: "#413F3F",
        borderRadius: 5,
      },
    ],
  };

  const dataWebsite = {
    labels,
    datasets: [
      {
        label: "Users Report",
        data: getUsersReport,
        backgroundColor: "#413F3F",
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="p-4 bg-white mb-4 rounded-md pt-4 shadow-md shadow-gray-200">
      <div className="flex justify-between h-[75vh]">
        <div className="w-[80%] flex flex-col justify-between pr-[1vw]">
          <div className="bg-white shadow-md shadow-gray-100 text-grey border border-grey h-[48.5%] mb-3 flex justify-between items-center w-full px-[1.5vw] py-2 rounded-3xl">
            <div className="w-[40%] flex flex-col justify-between h-full py-3">
              <div>
                <p className="text-lg text-grey font-semibold">Total Sales</p>
                <h1 className="text-2xl font-bold">Rs. {totalRevenue}</h1>
              </div>
              <div className="flex items-center">
                <AiOutlineArrowUp
                  size={32}
                  className="bg-grey text-white rotate-[30deg] p-1 rounded-full mr-1"
                />
                <p className="text-xl ml-1 font-medium">
                  {new Date().getMonth() != 0 &&
                    ((revenueReport[new Date().getMonth() - 1] -
                      revenueReport[new Date().getMonth()]) /
                      revenueReport[new Date().getMonth()]) *
                      100}
                  0%
                </p>
              </div>
            </div>
            <div className="w-[60%] h-full">
              <Bar data={data} options={getChartOptions()} />
            </div>
          </div>
          <div className="bg-white border border-grey shadow-md shadow-gray-100 flex flex-col justify-between text-grey h-[48.5%] w-full px-[1.5vw] rounded-3xl">
            <div className="pt-3 text-2xl font-semibold">
              <p className="text-grey">Users Report</p>
            </div>
            <div className="m-auto flex justify-center items-center w-full h-[75%]">
              <Bar data={dataWebsite} options={getChartOptions()} />
            </div>
          </div>
        </div>
        <div className="w-[25%] bg-grey h-full rounded-3xl text-white shadow-md shadow-gray-100 px-4 pt-3">
          <h1 className="text-3xl font-semibold text-center">Orders</h1>
          <div className="flex flex-col justify-between items-center h-[78%] mt-[10%]">
            <div className="bg-white text-grey w-[50%] flex flex-col justify-between items-center py-2 rounded-lg">
              This Day
              <div className="flex items-center">
                <p
                  className={`text-2xl font-semibold ${
                    orderReport?.day > 0 ? "text-green-600" : ""
                  }`}
                >
                  {orderReport?.day}
                </p>
              </div>
            </div>
            <div className="border bg-white text-grey w-[50%] flex flex-col justify-between items-center py-2 rounded-lg">
              This Week
              <div className="flex items-center">
                <p
                  className={`text-2xl font-semibold ${
                    orderReport?.week > 0 ? "text-green-600" : ""
                  }`}
                >
                  {orderReport?.week}
                </p>
              </div>
            </div>
            <div className="border bg-white text-grey w-[50%] flex flex-col justify-between items-center py-2 rounded-lg">
              This Month
              <div className="flex items-center">
                <p
                  className={`text-2xl font-semibold ${
                    orderReport?.month > 0 ? "text-green-600" : ""
                  }`}
                >
                  {orderReport?.month}
                </p>
              </div>
            </div>
            <div className="border bg-white text-grey w-[50%] flex flex-col justify-between items-center py-2 rounded-lg">
              Failed Orders
              <div className="flex items-center">
                <p
                  className={`text-2xl font-semibold ${
                    orderReport?.fail > 0 ? "text-brown" : ""
                  }`}
                >
                  {orderReport?.fail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
