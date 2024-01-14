"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import URL from "@/app/Utils/index";
import { getCookie } from "cookies-next";

const State = (props) => {
  // Login States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [login, setLogin] = useState();

  // Main SearchBar
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [recent, setRecent] = useState("");

  // Login Things
  const getUser = () => {
    if (getCookie("token")) {
      axios
        .post(`${URL}/user/get-user`, { token: getCookie("token") })
        .then((res) => {
          setLogin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLogin({});
    }
  };
  useEffect(() => {
    getUser();
  }, [getCookie("token")]);

  // Main Dashboard things
  const updateRecentSearch = () => {
    setRecent(localStorage.getItem("recent"));
  };

  useEffect(() => {
    updateRecentSearch();
  }, []);

  return (
    <Context.Provider
      value={{
        // Login Stuffs
        loginModalOpen,
        setLoginModalOpen,
        login,
        setLogin,
        getUser,
        showLogin,
        setShowLogin,

        // Main Things
        search,
        setSearch,
        showSearchBar,
        setShowSearchBar,
        updateRecentSearch,
        recent,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
