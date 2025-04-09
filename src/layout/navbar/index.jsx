import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Logo from "../../assets/logof.avif";

import BarLogo from "../../assets/logof2.avif";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageselector";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.replace("#", "");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 300);
    }

  }, [location.hash]);


  const handleNavigation = (section) => {
    if (isHomePage) {
      scroller.scrollTo(section, { smooth: true, duration: 500, offset: -70 });
    } else {
      navigate(`/#${section}`);
    }
    setIsOpen(false);
  };

  const { t, i18n } = useTranslation();
  const ChangeLng = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };
  return (
    <div className="fixed top-0 right-0 left-0 z-50 px-5 sm:px-[50px] lg:px-[10px] bg-[#EC0000] py-4 shadow-md transition-all duration-300">
      <div className="nav-in flex items-center justify-between">
        <div
          data-aos="flip-down"
          className="block items-center gap-3"
        >
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsOpen(true);
              }
            }}
          >
            <img
              src={BarLogo}
              alt="Menu Icon"
              className="max-w-[35px] xl:hidden h-[30px] sm:w-[45px] sm:h-[40px] lazyload"
            />
          </button>

        </div>


        <Link to="/" className="hidden xl:flex">
          <img
            data-aos="flip-down"
            src={Logo}
            alt="Logo"
            className="w-[180px] h-auto lazyload"
          />
        </Link>


        <div className="hidden lg:flex flex-1 justify-center">
          <ul
            data-aos="flip-down"
            className="flex items-center text-base gap-[30px] sm:gap-[20px]"
          >
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("about")}
              >
                {t("Biz haqimizda")}
              </button>
            </li>
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("teachers")}
              >
                {t("O‘qituvchilarimiz")}
              </button>
            </li>
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("courses")}
              >
                {t("Kurslarimiz")}
              </button>
            </li>
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("books")}
              >
                {t("Kitoblarimiz")}
              </button>
            </li>
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("faq")}
              >
                {t("FAQ")}
              </button>
            </li>
            <li>
              <button
                className="text-white uppercase font-[Montserrat] font-medium ml-3 cursor-pointer"
                onClick={() => handleNavigation("contact")}
              >
                {t("Kontakt")}
              </button>
            </li>
          </ul>
        </div>

        <div
          data-aos="flip-down"
          className="login-btn flex items-center gap-0 ml-2 text-[14px] xl:text-base"
        >
          <LanguageSelector />
          <Link
            to="/registration"
            className=" text-red-700 font-medium cursor-pointer font-[Montserrat] bg-white border-2 border-none py-[5px] px-[40px] rounded-lg"
          >
            {t("Kirish")}
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500 opacity-70 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`mobile-menu flex flex-col  items-start pr-6 lg:hidden fixed top-0 left-0 h-full font-[Montserrat] w-[70%] min-[500px]:w-[60%] bg-white text-black shadow-lg transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="py-6 px-5 ml-[85%]">
          <button
            onClick={() => setIsOpen(false)}
            className="text-black text-2xl"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 text-[18px] min-[500px]:text-2xl">
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("about")}
            >
              {t("Biz haqimizda")}
            </button>
          </li>
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("teachers")}
            >
              {t("O‘qituvchilarimiz")}
            </button>
          </li>
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("courses")}
            >
              {t("Kurslarimiz")}
            </button>
          </li>
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("books")}
            >
              {t("Kitoblarimiz")}
            </button>
          </li>
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("faq")}
            >
              {t("FAQ")}
            </button>
          </li>
          <li>
            <button
              className="uppercase font-semibold hover:underline cursor-pointer"
              onClick={() => handleNavigation("contact")}
            >
              {t("Kontakt")}
            </button>
          </li>
        </ul>

        <h1 className="last:bottom-0 textGrow font-[Andasia Personal Use] font-normal text-[26px] text-center m-auto w-full  absolute leading-[100%] tracking-normal">
          {t("Biz birga rivojlanamiz")}
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
