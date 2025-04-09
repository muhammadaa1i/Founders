import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function About() {
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
        <div id="about">
            <h1
                data-aos='fade-up'
                className="py-[10px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-4xl xl:text-[50px] leading-[100%] tracking-normal text-center">
                {t("Biz haqimizda")}:
            </h1>
            <div
                data-aos='zoom-in'
                className="w-full h-full flex justify-center my-6">
                <iframe
                    src="https://www.youtube.com/embed/z7WIMyySMAE?si=VT8If3_JzDJ4yijV"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-[90vw] h-[40vh] min-[450px]:h-[50vh] sm:h-[60vh] md:h-[80vh] rounded-xl shadow-xl"
                ></iframe>
            </div>
            <div className="space-y-6 px-[50px] pt-6 pb-10 text-xl md:text-xl xl:text-2xl 2xl:text-3xl ">
                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    {t("Founders school is not just a learning center,")}
                    <span className="font-bold text-[#EC0000]"> {t("it is a huge family.")} </span>
                    {t("We opened our first doors for students")}
                    <span className="font-bold text-[#EC0000]"> {t("in 2021, November 8th.")} </span>
                </p>

                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    {t("Our company has taught more than")}
                    <span className="font-bold text-[#EC0000]"> {t("2000 students")} </span>
                    {t("so far and made a huge number of IELTS results with its students,")}
                    <span className="font-bold text-[#EC0000]"> {t("7.0+ band scores on average.")} </span>
                </p>

                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    {t('"Founders" is about our')}
                    <span className="font-bold text-[#EC0000]"> {t("motivated")} </span>
                    {t("and")}
                    <span className="font-bold text-[#EC0000]"> {t("passionate")} </span>
                    <span className="font-bold text-[#EC0000]"> {t("students")} </span>
                    {t("who will become future")}
                    <span className="font-bold text-[#EC0000]"> {t("leaders")} </span>
                    {t("and")}
                    <span className="font-bold text-[#EC0000]"> {t("founders")} </span>
                    {t("of successful companies.")}
                </p>
            </div>


        </div>
    )
}

export default About