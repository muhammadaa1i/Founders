import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Teacher1 from "/src/assets/tech1.avif";
import Teacher2 from "/src/assets/tech2.avif";
import Teacher3 from "/src/assets/tech3.avif";
import Teacher4 from "/src/assets/tech4.avif";
import Teacher5 from "/src/assets/tech5.avif";
import Teacher6 from "/src/assets/tech6.avif";
import Teacher7 from "/src/assets/tech7.avif";
import Teacher8 from "/src/assets/tech8.avif";
import Teacher9 from "/src/assets/tech9.avif";
import TeacherCard from "./component/index";
import { useRef, useState } from "react";

// ✅ slick css importlari
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";


const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full z-10 max-[450px]:hidden"
    >
        <ChevronLeft size={24} />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full z-10 max-[450px]:hidden"
    >
        <ChevronRight size={24} />
    </button>
);

function Teachers() {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        },
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                },
            },
        ],
    };
    const { t, i18n } = useTranslation()
    const ChangeLng = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage)
        localStorage.setItem('i18nextLng', selectedLanguage)
    }

    const teachersData = [
        { img: Teacher1, teacher: t("Iskhakova Leyla"), experience: t("4 years+"), IELTS: "7.0", position: t("ESL Teacher | IELTS Instructor") },
        { img: Teacher2, teacher: t("Kambarova Omina"), experience: t("2 years+"), position: t("ESL Teacher") },
        { img: Teacher3, teacher: t("Yusupov Bunyodbek"), experience: t("1 years+"), IELTS: "7.5", position: t("ESL Teacher") },
        { img: Teacher4, teacher: t("Abdumalikova Parizoda"), experience: t("7 years+"), position: t("ESL Teacher") },
        { img: Teacher5, teacher: t("Asadova Zarina"), experience: t("15 years+"), position: t("Senior ESL Teacher") },
        { img: Teacher6, teacher: t("Karajanova Kamila"), experience: t("2.5 years+"), position: t("ESL Teacher") },
        { img: Teacher7, teacher: t("Abatbaeva Sarbina"), experience: t("2.5 years+"), IELTS: "7.0", position: t("ESL Teacher") },
        { img: Teacher8, teacher: t("Soatmurodova Dinora"), experience: t("2.5 years+"), IELTS: "7.5", position: t("ESL Teacher") },
        { img: Teacher9, teacher: t("Zikrullayeva Sarvinoz"), IELTS: "7.5", experience: t("1.5 years+"), position: t("ESL Teacher") },
    ];

    return (
        <div id="teachers" className="text-center relative py-[20px]">
            <h1
                data-aos="fade-up"
                className="py-[30px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal text-center"
            >
                {t("O‘qituvchilarimiz")}:
            </h1>

            <div className="relative mt-8 px-4">
                <Slider ref={sliderRef} {...settings}>
                    {teachersData.map((item, index) => {
                        const isMiddle =
                            (index === currentSlide % teachersData.length) ||
                            (index === (currentSlide + teachersData.length) % teachersData.length);

                        return (
                            <div
                                key={index}
                                className="px-3 transition-transform duration-300 ease-in-out teacher-slide"
                                data-aos="fade-up"
                            >
                                <TeacherCard {...item} isMiddle={isMiddle} />
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div >
    );
}

export default Teachers;
