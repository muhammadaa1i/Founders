import React, { useEffect } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import generalBook1 from "../../../assets/books5.avif";
import generalBook2 from "../../../assets/books6.avif";
import generalBook3 from "../../../assets/books7.avif";
import generalBook4 from "../../../assets/books8.avif";
import levelBook1 from "../../../assets/books9.avif";
import levelBook2 from "../../../assets/books10.avif";
import levelBook3 from "../../../assets/books11.avif";
import levelBook4 from "../../../assets/books12.avif";
import IeltsBook1 from "../../../assets/books1.avif";
import IeltsBook2 from "../../../assets/books2.avif";
import IeltsBook3 from "../../../assets/books3.avif";
import IeltsBook4 from "../../../assets/books4.avif";
import { useTranslation } from "react-i18next";

function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-2 top-[55%] max-md:hidden transform -translate-y-1/2 bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 hover:bg-red-700 transition">
            <ChevronLeft size={24} />
        </button>
    );
}
function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-2 top-[55%] max-md:hidden transform -translate-y-1/2 bg-red-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 hover:bg-red-700 transition">
            <ChevronRight size={24} />
        </button>
    );
}
function Books() {


    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    useEffect(() => {
        Aos.init({ duration: 800 });
    }, []);

    const { t, i18n } = useTranslation()
    const ChangeLng = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage)
        localStorage.setItem('i18nextLng', selectedLanguage)
    }
    const bookCategories = [
        { title: t("General English"), books: [generalBook1, generalBook2, generalBook3, generalBook4] },
        { title: t("IELTS"), books: [IeltsBook1, IeltsBook2, IeltsBook3, IeltsBook4] },
        { title: t("Kids English"), books: [levelBook1, levelBook2, levelBook3, levelBook4] },
    ];
    return (
        <div id="books" className="books bg-gray-50 relative">
            <h1
                data-aos='fade-up'
                className="py-[30px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-4xl xl:text-[50px] leading-[100%] tracking-normal text-center">

                {t("Kitoblarimiz")}:
            </h1>

            <div className="relative ">
                <Slider {...settings} className="rounded-2xl ">
                    {bookCategories.map((category, index) => (
                        <div data-aos="zoom-in" key={index}>
                            <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-[Montserrat] font-medium text-center mb-6">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-4 gap-6 py-5 max-[550px]:grid-cols-2 place-items-center">
                                {category.books.map((book, i) => (
                                    <div key={i} className=" flex justify-center w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px] ">
                                        <img
                                            src={book}
                                            alt={`${category.title} Book ${i + 1}`}
                                            className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Books;

