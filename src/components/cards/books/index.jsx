import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import generalBook1 from "/src/assets/generalBook1.avif";
import generalBook2 from "/src/assets/generalBook2.avif";
import generalBook3 from "/src/assets/generalBook3.avif";
import generalBook4 from "/src/assets/generalBook4.avif";
import levelBook1 from "/src/assets/levelBook1.avif";
import levelBook2 from "/src/assets/levelBook2.avif";
import levelBook3 from "/src/assets/levelBook3.avif";
import levelBook4 from "/src/assets/levelBook4.avif";
import IeltsBook1 from "/src/assets/IeltsBook1.avif";
import IeltsBook2 from "/src/assets/IeltsBook2.avif";
import IeltsBook3 from "/src/assets/IeltsBook3.avif";
import IeltsBook4 from "/src/assets/IeltsBook4.avif";
import Aos from "aos";

function CustomPrevArrow(props) {
    const { onClick } = props;
    return <div className="custom-arrow custom-prev" onClick={onClick}></div>;
}

function CustomNextArrow(props) {
    const { onClick } = props;
    return <div className="custom-arrow custom-next" onClick={onClick}></div>;
}

function Books() {
    const bookCategories = [
        { title: "General English", books: [generalBook1, generalBook2, generalBook3, generalBook4] },
        { title: "IELTS", books: [IeltsBook1, IeltsBook2, IeltsBook3, IeltsBook4] },
        { title: "Kids English", books: [levelBook1, levelBook2, levelBook3, levelBook4] },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    return (
        <div id="books" className="books px-4 bg-gray-50">
            <h1
                data-aos='fade-up'
                className="text-[#EC0000] my-[20px] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal font-[Aquire] text-center">
                Kitoblarimiz:
            </h1>
            <Slider {...settings} className="rounded-2xl px-[30px]">
                {bookCategories.map((category, index) => (
                    <div
                        data-aos='zoom-in'
                        key={index}>
                        <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-[Montserrat] font-medium text-center">{category.title}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {category.books.map((book, i) => (
                                <div key={i} className="w-full h-full">
                                    <img
                                        src={book}
                                        alt={`${category.title} Book ${i + 1}`}
                                        className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] object-cover rounded-lg hover:scale-105 transition-transform duration-300 lazyload"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Books;