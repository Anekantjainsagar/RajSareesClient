"use client";
import Context from "@/app/(website)/Context/Context";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import gsap, { Power2 } from "gsap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import URL from "@/app/Utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

const Login = () => {
  const {
    loginModalOpen,
    setLoginModalOpen,
    getUser,
    showLogin,
    setShowLogin,
  } = useContext(Context);
  const history = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  function closeModal() {
    setLoginModalOpen(false);
  }

  const onRegister = () => {
    if (
      !register?.email ||
      !register?.password ||
      !register?.phone ||
      !register?.name
    ) {
      toast.error("Please fill all the details");
    } else {
      axios
        .post(`${URL}/user/signup`, register)
        .then((res) => {
          if (res.status == 200) {
            setLogin(res.data.data);
            setRegister({
              email: "",
              password: "",
              name: "",
              phone: "",
            });
            setLoginModalOpen(false);
            getUser();
            setCookie("token", res.data.jwtToken);
            toast.success("Registered successfully");
          } else {
            toast.error(res.data.data);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const onLogin = () => {
    if (!login?.email || !login?.password) {
      toast.error("Please fill all the details");
    } else {
      axios
        .post(`${URL}/user/signin`, { ...login })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.user == "Admin") {
              history.push("/admin");
              setCookie("admin_token", res.data.jwtToken);
              setLoginModalOpen(false);
              setLogin({ email: "", password: "" });
            } else {
              setLogin(res.data.data);
              getUser();
              setCookie("token", res.data.jwtToken);
              setLoginModalOpen(false);
              setLogin({ email: "", password: "" });
            }
            toast.success("Login Successful");
          } else {
            toast.error(res.data.data);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    if (showLogin) {
      gsap.to("#login", { y: -400, duration: 1, ease: Power2.easeInOut });
      gsap.fromTo(
        "#register",
        { y: 500 },
        { y: 0, duration: 1, ease: Power2.easeInOut }
      );
    } else {
      gsap.fromTo(
        "#login",
        { y: -400 },
        { y: 0, duration: 1, ease: Power2.easeInOut }
      );
      gsap.to("#register", { y: 0, duration: 1, ease: Power2.easeInOut });
    }
  }, [showLogin]);

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={loginModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-[80vw] md:w-[25vw] px-3 py-5 rounded-xl border border-brown shadow-sm shadow-brown bg-orange flex md:flex-row flex-col items-center justify-between overflow-hidden">
          <div
            className={`flex flex-col w-full items-center px-[1vw] ${
              showLogin ? "hidden" : "block"
            }`}
            id="login"
          >
            <p className="text-2xl text-brown font-semibold">Login</p>
            <div className="w-full mt-3 px-2">
              <input
                type="text"
                value={login?.email}
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                }}
                placeholder="Enter your Email or Phone no."
                className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
              />
              <div className="w-full relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={login?.password}
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value });
                  }}
                  placeholder="Password"
                  className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
                />
                {passwordVisible ? (
                  <AiOutlineEye
                    size={25}
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                    className="absolute right-2 top-1/2 text-brown -translate-y-1/2 mt-1.5 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                    className="absolute right-2 top-1/2 text-brown -translate-y-1/2 mt-1.5 cursor-pointer"
                  />
                )}
              </div>
              <div className="flex md:flex-row flex-col items-center md:items-start justify-between">
                <button
                  onClick={onLogin}
                  className="px-6 rounded-lg mt-3 font-semibold bg-brown text-white py-1"
                >
                  Login
                </button>
                <p className="mt-2 text-sm w-full text-end">
                  Don’t have an account?
                  <span
                    className="text-brown font-semibold ml-1 cursor-pointer"
                    onClick={(e) => {
                      setShowLogin(!showLogin);
                    }}
                  >
                    Register Now
                  </span>{" "}
                </p>
              </div>
              <p
                onClick={(e) => {
                  if (!login?.email) {
                    toast.error("Please fill the email for the password reset");
                  } else {
                    axios
                      .post(`${URL}/login/password-reset`, {
                        email: login?.email,
                      })
                      .then((res) => {
                        if (res.status === 200) {
                          toast.success(res.data.data);
                        }
                      })
                      .catch((err) => {
                        toast.error(err.message);
                      });
                  }
                }}
                className="text-sm text-end text-brown font-semibold mt-1 ml-1 cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col items-center px-[1vw] ${
              showLogin ? "block" : "hidden"
            }`}
            id="register"
          >
            <p className="text-2xl text-brown font-semibold">
              Create an Account
            </p>
            <div className="w-full mt-4 px-2">
              <h1 className="text-[17px] text-[#882437cf] font-semibold">
                Sign Up to continue
              </h1>
              <input
                type="text"
                value={register?.name}
                onChange={(e) => {
                  setRegister({ ...register, name: e.target.value });
                }}
                placeholder="Enter Your Name"
                className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
              />
              <input
                type="text"
                value={register?.email}
                onChange={(e) => {
                  setRegister({ ...register, email: e.target.value });
                }}
                placeholder="Enter Your Email Id"
                className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
              />
              <input
                type="number"
                value={register?.phone}
                onChange={(e) => {
                  setRegister({ ...register, phone: e.target.value });
                }}
                placeholder="Enter Your Phone no."
                className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
              />
              <div className="w-full relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  onChange={(e) => {
                    setRegister({ ...register, password: e.target.value });
                  }}
                  value={register?.password}
                  placeholder="Create your Password"
                  className="w-full outline-none bg-transparent border border-brown text-brown placeholder:text-[#8824377d] px-4 py-1.5 mt-3 rounded-lg"
                />
                {passwordVisible ? (
                  <AiOutlineEye
                    size={25}
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                    className="absolute right-2 top-1/2 text-brown -translate-y-1/2 mt-1.5 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                    className="absolute right-2 top-1/2 text-brown -translate-y-1/2 mt-1.5 cursor-pointer"
                  />
                )}
              </div>
              <div className="flex md:flex-row flex-col items-center md:items-start justify-between">
                <button
                  onClick={onRegister}
                  className="w-4/12 rounded-lg mt-3 font-semibold bg-brown text-white py-1"
                >
                  Sign Up
                </button>
                <p className="mt-2 text-sm w-full md:w-8/12 text-end">
                  Already have an account?
                  <span
                    className="text-brown ml-1 font-semibold cursor-pointer"
                    onClick={(e) => {
                      setShowLogin(!showLogin);
                    }}
                  >
                    Login now
                  </span>{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end w-full px-2 mt-1"></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
