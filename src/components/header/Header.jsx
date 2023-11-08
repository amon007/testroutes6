import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMoon,
  faShoppingCart,
  faSunPlantWilt,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../App";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { showBasket, setShowBasket, addToBasket } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const body = document.body;
    if (localStorage.getItem("moon") === "true") {
      setIsDarkMode(true);
      body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const body = document.body;
    if (isDarkMode) body.classList.remove("dark-mode");
    else body.classList.add("dark-mode");
    localStorage.setItem("moon", !isDarkMode);
  };

  return (
    <>
      <div className=" fixed w-full z-[10000]">
        <div className=" w-full bg-black">
          <div className="topHeader flex justify-around items-center text-[#A2A6B0] font-semibold text-[12px] h-[44px] w-full max-w-[1400px] mx-auto ">
            <div>
              <span>
                Երկ-Կիր:
                <span className=" text-white ml-2">9:00 AM - 5:30 PM</span>
              </span>
            </div>
            <div>
              <span className=" hasce">
                Այցելեք մեր ցուցասրահը Փողոց Հասցե Քաղաք Հասցե,
                <a href="/contact">
                  <span className=" text-white ml-2 border-b border-white cursor-pointer">
                    Կապ մեզ հետ
                  </span>
                </a>
              </span>
            </div>
            <div>
              <span className="flex items-center text-white">
                Call Us: (00) 1234 5678:
                <div className=" ml-4">
                  <FontAwesomeIcon
                    icon={faFacebookSquare}
                    className="mr-2 h-[20px]"
                  />
                  <FontAwesomeIcon
                    icon={faInstagramSquare}
                    className=" h-[20px]"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            isDarkMode
              ? "dark-mode logo duration-300 ease-linear logo h-[70px] w-full flex items-center justify-start p-8"
              : " logo duration-500 h-[70px] w-full  bg-slate-100 flex items-center justify-start p-8"
          }
        >
          <div className="logo w-full max-w-[1400px] mx-auto flex justify-between items-center ">
            <div className=" flex">
              <img
                src="/icon.png"
                alt=""
                className=" h-[40px] cursor-pointer"
                onClick={() => navigate("/")}
              />
              <div className="hCont flex items-center">
                <div
                  className={
                    isDarkMode
                      ? " ml-2 mr-4 hover:border-b-2 font-semibold"
                      : "ml-2 mr-4 hover:border-b-2 border-black font-semibold"
                  }
                >
                  <Link to={"/about"}>Մեր մասին</Link>
                </div>
                <div
                  className={
                    isDarkMode
                      ? "ml-2 mr-4 hover:border-b-2 font-semibold"
                      : "ml-2 mr-4 hover:border-b-2 border-black font-semibold"
                  }
                >
                  <a href={"/contact"}>Կապ մեզ հետ</a>
                </div>
              </div>
            </div>

            <div className=" flex">
              <div
                onClick={() => setShowBasket(!showBasket)}
                className=" cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  fade
                  className={
                    isDarkMode
                      ? "text-white sm:h-[25px] sm:w-[25px] lg:h-[30px] lg:w-[30px]"
                      : "sm:h-[25px] sm:w-[25px] lg:h-[30px] lg:w-[30px]"
                  }
                />
                {addToBasket.length > 0 ? (
                  <div className=" inline lg:bg-black lg:text-white font-semibold lg:px-1.5 lg:py-0.5 rounded-full">
                    {addToBasket.length > 0 ? addToBasket.length : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={toggleDarkMode}
                className={
                  isDarkMode
                    ? "text-white ml-2 cursor-pointer"
                    : "ml-2 cursor-pointer"
                }
              >
                {isDarkMode ? (
                  <FontAwesomeIcon
                    icon={faMoon}
                    className=" h-[25px] w-[25px]"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSunPlantWilt}
                    className=" h-[25px] w-[25px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[110px]"></div>
    </>
  );
}
