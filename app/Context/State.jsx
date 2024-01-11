"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import URL from "../Utils";
import { getCookie } from "cookies-next";

const State = (props) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [login, setLogin] = useState();

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

  return (
    <Context.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        login,
        setLogin,
        getUser,
        showLogin,
        setShowLogin,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
