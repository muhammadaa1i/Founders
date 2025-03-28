import React, { useEffect, useRef, useState } from "react";

import news1 from "/src/assets/news1.avif";
import news2 from "/src/assets/news2.avif";
import news3 from "/src/assets/news3.avif";
import news4 from "/src/assets/news4.avif";
import kid from "/src/assets/kid.avif";

function News() {
    const imgs = [news1, news2, news3, news4, kid];
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
        <div className="news px-6 bg-gray-50 flex flex-col items-center overflow-hidden">
            <h1 className="text-[#EC0000] my-[20px] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal font-[Aquire] text-center">
                Qaynoq yangiliklar:
            </h1>

            <div className="w-full overflow-hidden relative">
                <div ref={sliderRef} className="flex gap-6 w-full overflow-x-scroll no-scrollbar whitespace-nowrap scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {clones.map((item, index) => (
                        <a href="https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4" target="_blank" key={index} className="min-w-[250px] 2xl:min-w-[300px] h-auto rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-4 flex items-center justify-center">
                            <img src={item} alt={`News ${index + 1}`} className="w-[380px] h-[300px] rounded-[40px] lazyload" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
