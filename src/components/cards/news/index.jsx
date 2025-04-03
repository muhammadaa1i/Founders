import React, { useEffect, useRef, useState } from "react";

import news1 from "/src/assets/news1.avif";
import news2 from "/src/assets/news2.avif";
import news3 from "/src/assets/news3.avif";
import news4 from "/src/assets/news4.avif";
// import kid from "/src/assets/kid.avif";

function News() {
    const imgs = [news1, news2, news3, news4];
    const sliderRef = useRef(null);
    const [clones, setClones] = useState([]);

    useEffect(() => {
        setClones([...imgs, ...imgs]);
    }, []);

    useEffect(() => {
        const slider = sliderRef.current;
        let scrollInterval;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (slider) {
                    slider.scrollLeft += 1;
                    if (slider.scrollLeft >= slider.scrollWidth / 2) {
                        slider.scrollLeft = 0;
                    }
                }
            }, 15);
        };

        startScrolling();
        return () => clearInterval(scrollInterval);
    }, [clones]);

    return (
        <div className="news px-4 sm:px-6 bg-gray-50 flex flex-col items-center overflow-hidden">

            <h1 data-aos='fade-up'
                className="py-[30px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal text-center">
                Qaynoq yangiliklar:
            </h1>
            <div className="w-full overflow-hidden relative my-[30px] ">
                <div
                    ref={sliderRef}
                    className="flex py-[30px] gap-4 sm:gap-6 w-full overflow-x-auto no-scrollbar whitespace-nowrap scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {clones.map((item, index) => (
                        <a
                            href="https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4"
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="min-w-[300px]  sm:min-w-[150px] sm:min-h-[100px] md:min-w-[280px] lg:min-w-[400px] w-[400px] h-[500px]  overflow-hidden  rounded-[40px] border-[#616161] shadow-[10px_10px_15px_0px_#00000059]"
                        >
                            <img
                                src={item}
                                alt={`News ${index + 1}`}
                                className="w-full h-full object-cover rounded-[40px] lazyload  sm:w-[350px] md:w-[380px] lg:w-[400px] border-[#616161] shadow-[10px_10px_15px_0px_#00000059] "
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );


}

export default News;
