import React, { useEffect } from "react";
import mainPic from "/src/assets/mainpic.avif";
import Aos from "aos";
import { Link } from "react-router-dom";
import Button from "../../button";

function First() {
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);
    return (
        <section className="ielts flex flex-col-reverse md:flex-row md:mx-12 mt-24 md:mt-32 gap-14 xl:mt-44">
            <div
                data-aos='fade-up'
                className="ielts-in w-full flex flex-col justify-evenly md:items-start text-center md:text-left max-md:px-4">
                <div className="flex flex-col gap-6 xl:gap-16 lg:mt-[-50px] xl:mt-[-100px]">
                    <h1 className="text-red-600 text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold font-[Montserrat] 2xl:max-w-[750px]">
                        Biz millatlarga umumiy tilda muloqot qilishga yordam beramiz!
                    </h1>
                    <p className="font-medium text-sm md:text-xl sm:text-base xl:text-xl 2xl:text-2xl 2xl:max-w-[750px] font-[Montserrat]">
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
            <div
                data-aos='fade-up'
                className="rounded-[30px] m-auto sm:rounded-[40px] md:rounded-[50px] w-[90%] sm:w-[80%] md:max-w-[700px] xl:w-full h-auto flex justify-center">
                <img src={mainPic} alt="image_main" className="w-[60%] max-h-[700px] h-full md:w-[100%] xl:w-[835px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lazyload" />
            </div>
        </section>
    );
}

export default First;