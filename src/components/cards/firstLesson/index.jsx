import React, { useEffect } from "react";
import Aos from "aos";
import Button from "../../button";
import Swiperslide from "./swiperslide/index";
import { useTranslation } from "react-i18next";

function First() {
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);
    const { t, i18n } = useTranslation()
    const ChangeLng = (e) => {
        const selectedLanguage = e.target.value
        i18n.changeLanguage(selectedLanguage)
    }
    return (
        <section className="ielts flex flex-col-reverse 2xl:max-w-[1920px] md:flex-row md:mx-12 mt-24 xl:mt-32 md:mt-32 gap-3">
            <div
                data-aos='fade-up'
                className="ielts-in w-full flex flex-col gap-16 justify-center md:items-start text-center md:text-left max-md:px-4 max-md:items-center">
                <div className="flex flex-col gap-6 xl:gap-8 lg:mt-[-50px] xl:mt-[-100px] leading-[700%]">
                    <h1 data-aos='fade-up'
                        className="ielts-text font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl xl:mt-8 min-[1720px]:text-[80px] leading-[100%] tracking-normal">
                        {t("Kafolatlangan")} <br />
                        <span className="bg-[#EC0000] text-white px-2 inline-block rounded-md mb-2">IELTS</span> {t("yoki")} <br />
                        <span className="bg-[#EC0000] text-white px-2 inline-block rounded-md mt-2">{t("BEPUL")}</span> {t("o'qing!")}
                    </h1>
                    <p className="font-medium text-sm max-md:max-w-[330px] md:text-xl sm:text-base xl:text-xl 2xl:text-2xl xl:max-w-[750px] font-[Montserrat]">
                        <b>Founders School</b> {t("shu vaqtgacha")} <b>2 000+</b> {t("o‘quvchilarga hayotini o‘zgartirishga o‘z hissasini qo‘shgan!")}
                    </p>
                </div>
                <Button
                    to="/registration"
                    className="text-[14px] text-white sm:text-xl md:text-2xl lg:text2xl 2xl:text-3xl"
                >
                    {t("Birinchi darsga yozilish")}
                </Button>


            </div>

            <Swiperslide />
        </section>
    );
}

export default First;