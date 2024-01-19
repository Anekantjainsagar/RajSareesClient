"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import URL from "@/app/Utils/index";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

const State = (props) => {
  const pathname = usePathname();
  const history = useRouter();

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
  const [cart, setCart] = useState([]);

  const [sortStore, setSortStore] = useState("Relevance");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);
  const [fabricFilter, setFabricFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [subCategories, setSubCategories] = useState();

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
  const addToWishlist = (product) => {
    if (getCookie("token")) {
      axios
        .post(`${URL}/product/add-to-wishlist/${product}`, {
          token: getCookie("token"),
        })
        .then((res) => {
          if (res?.data?.modifiedCount > 0) {
            getUser();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const removeFromWishlist = (product) => {
    if (getCookie("token")) {
      axios
        .post(`${URL}/product/remove-from-wishlist/${product}`, {
          token: getCookie("token"),
        })
        .then((res) => {
          if (res?.data?.modifiedCount > 0) {
            getUser();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const addToCart = (product) => {
    let temp = localStorage.getItem("cart");
    product = { ...product, quantity: 1 };
    if (temp) {
      temp = JSON.parse(temp);
      setCart([...temp, product]);
      let data = JSON.stringify([...temp, product]);
      localStorage.setItem("cart", data);
    } else {
      setCart([product]);
      let data = JSON.stringify([product]);
      localStorage.setItem("cart", data);
    }
  };
  const removeFromCart = (product) => {
    let data = JSON.parse(localStorage.getItem("cart"));
    if (data) {
      data = data?.filter((e) => e?._id != product?._id);
      setCart(data);
      localStorage.setItem("cart", JSON.stringify(data));
    }
  };
  const getSubCategories = () => {
    axios.get(`${URL}/category/get-sub-category`).then((res) => {
      setSubCategories(res.data);
    });
  };
  useEffect(() => {
    getSubCategories();
    updateRecentSearch();
    const data = JSON.parse(localStorage.getItem("cart"));
    setCart(data);
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
      .get(
        `${URL}/product/get-all?categoryIds=${categoryFilter}&fabric=${fabricFilter}&gender=${genderFilter}&color=${colorFilter}`
      )
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
  }, [categoryFilter, genderFilter, colorFilter, fabricFilter]);

  useEffect(() => {
    if (!getCookie("token") && !pathname.includes("admin")) {
      history.push("/");
      setShowLogin(false);
      setLoginModalOpen(true);
    }
  }, [
    pathname.includes("/products/"),
    pathname.includes("/wishlist"),
    pathname.includes("/dashboard"),
    pathname.includes("/cart"),
  ]);

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
        subCategories,

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
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        cart,
        genderFilter,
        setGenderFilter,
        colorFilter,
        setColorFilter,
        fabricFilter,
        setFabricFilter,

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
