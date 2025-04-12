import { Link } from "react-router-dom";
import Logo from "../../assets/logof.avif";
import { useEffect } from "react";
import Aos from "aos";
import { useTranslation } from "react-i18next";
import MapWithLogo from "./logo";

function Footer() {

    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);
    const { t, i18n } = useTranslation()
    const ChangeLng = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage)
        localStorage.setItem('i18nextLng', selectedLanguage)
    }
    return (
        <footer id="contact" className="bg-[#EC0000] text-white text-center py-10 xl:px-[110px] rounded-tl-[10px] rounded-tr-[10px]">
            <h1
                data-aos='zoom-in'
                className="textGrow font-[Andasia Personal Use] font-normal text-3xl sm:text-5xl xl:text-[78px] text-center">
                We grow together!
            </h1>

            <div
                data-aos='fade-up'>
                <MapWithLogo />
            </div>

            <div
                data-aos='zoom-in'
                className="flex items-center flex-col justify-between gap-10 mt-10 md:flex-row md:mx-8 md:pl-4">
                <Link
                    className="flex justify-center"
                    to="/">
                    <img
                        loading="lazy"
                        src={Logo}
                        alt="Logo"
                        className="w-[200px] h-[50px] xl:w-[300px] xl:h-[60px]"
                    />
                </Link>

                <div className="flex flex-col gap-3 text-[26px] font-[Montserrat]">
                    <p>{t("Biz bilan bog‘lanish:")}</p>
                    <a href="tel: +998 71 205-53-33 ">+998 71 205-53-33</a>
                </div>

                <div id="contact" className="flex flex-col gap-3 text-[26px] font-[Montserrat]">
                    <p>{t("Ijtimoiy tarmoqlarimiz:")}</p>
                    <div className="flex gap-3 justify-center items-center">
                        <a target="_blank" rel="noopener noreferrer" href="https://t.me/founders_school_uz"><i className="fa-brands fa-telegram"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4"><i className="fa-brands fa-instagram"></i></a>
                        <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/@founders_school?si=K9zOe7AUjrbLbJsy"><i className="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;