import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import news1 from "/src/assets/news1.avif";
import news2 from "/src/assets/news2.avif";
import news3 from "/src/assets/news3.avif";
import news4 from "/src/assets/news4.avif";
import kid from "/src/assets/kid.avif";

function News() {
    const imgs = [news1, news2, news3, news4, kid];

    const settings = {
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
        draggable: true,
        swipe: true,
        touchMove: true,
        rtl: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };

    return (
        <div className="news px-6 bg-gray-50 flex flex-col items-center overflow-hidden">
            <h1 className="text-[#EC0000] my-[20px] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal font-[Aquire] text-center">
                Qaynoq yangiliklar:
            </h1>

            <div className="w-full relative">
                <Slider {...settings} className="w-full">
                    {imgs.map((item, index) => (
                        <a
                            href="https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4"
                            target="_blank"
                            key={index}
                            className="px-4 flex items-center justify-center"
                        >
                            <img
                                src={item}
                                alt={`News ${index + 1}`}
                                className="w-[260px] h-[350px] rounded-[40px] max-[425px]:w-[130px] max-[425px]:h-[170px] max-[425px]:rounded-[13px] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                            />
                        </a>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default News;