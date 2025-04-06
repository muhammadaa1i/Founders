import React, { useEffect } from "react";
import Aos from "aos";
import Button from "../../button";
import Swiperslide from "./swiperslide/index";

function First() {
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);
    return (
        <section className="ielts flex flex-col-reverse 2xl:max-w-[1920px] xl:mx-20 xl:pl-8 md:flex-row md:mx-12 mt-24 xl:mt-32 md:mt-32 gap-3">
            <div
                data-aos='fade-up'
                className="ielts-in w-full flex flex-col gap-4 justify-evenly md:items-start text-center md:text-left max-md:px-4 max-md:items-center">
                <div className="flex flex-col gap-6 xl:gap-16 lg:mt-[-50px] xl:mt-[-100px] leading-[700%]">
                    <h1 data-aos='fade-up'
                        className="ielts-text font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] xl:mt-10 leading-[100%] tracking-normal">
                        Kafolatlangan <br />
                        <span className="bg-[#EC0000] text-white px-2 inline-block rounded-md mb-2">IELTS</span> yoki <br />
                        <span className="bg-[#EC0000] text-white px-2 inline-block rounded-md mt-2">BEPUL</span> o'qing!
                    </h1>
                    <p className="font-medium text-sm max-md:max-w-[330px] md:text-xl sm:text-base xl:text-xl 2xl:text-2xl 2xl:max-w-[750px] font-[Montserrat]">
                        <b>Founders School</b> shu vaqtgacha <b>2 000+</b> o‘quvchilarni hayotini o‘zgartirishga o‘z hissasini qo‘shgan!
                    </p>
                </div>
                <Button
                    to="/registration"
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                    Birinchi darsga yozilish
                </Button>
            </div>

            <Swiperslide />
        </section>
    );
}

export default First;