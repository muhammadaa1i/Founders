import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import engFlag from "../../assets/engflag.png";
import uzFlag from "../../assets/Property 1=flag.png";
import ruFlag from "../../assets/ruflag.png";

const languages = [
  { code: "en", flag: engFlag },
  { code: "uz", flag: uzFlag },
  { code: "ru", flag: ruFlag },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setIsOpen(false);
  };


  return (
    <div className="relative w-14 inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-8 h-8  rounded-md"
      >
        <img
          src={currentLang.flag}
          alt={currentLang.code}
          className="w-full h-full"
          loading="lazy"
        />
      </button>

      {isOpen && (
        <div className="absolute w-14 m-auto z-10 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg left-4 transform -translate-x-1/2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full flex justify-center items-center gap-2 py-2 text-left"
            >
              <img
                loading="lazy"
                src={lang.flag}
                alt={lang.code}
                className="w-8 h-8"
              />
            </button>
          ))}

        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
