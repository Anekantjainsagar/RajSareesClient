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

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [sortStore, setSortStore] = useState("Relevance");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  // Admin panel
  const getCategories = () => {
    axios
      .get(`${URL}/category/get-all`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProducts = () => {
    axios
      .get(`${URL}/product/get-all?categoryIds=${categoryFilter}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [categoryFilter]);

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
        sortStore,
        setSortStore,
        categoryFilter,
        setCategoryFilter,

        // Admin things
        categories,
        getCategories,
        getProducts,
        products,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
