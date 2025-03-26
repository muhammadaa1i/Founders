import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function About() {
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    return (
        <div id="about">
            <h1
                data-aos='fade-up'
                className="text-[#EC0000] font-bold text-3xl sm:text-6xl xl:text-[80px] leading-[100%] tracking-normal font-[Aquire] text-center">
                Biz haqimizda:
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

            <div className="space-y-6 px-[50px] pt-6 pb-10 text-xl md:text-2xl xl:text-3xl 2xl:text-4xl ">
                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    Founders school is not just a learning center,
                    <span className="font-bold text-[#EC0000]"> it is a huge family. </span>
                    We opened our first doors for students
                    <span className="font-bold text-[#EC0000]"> in 2021, November 8th. </span>
                    Our company was founded by
                    <span className="font-bold text-[#EC0000]"> two friends Ziyodbek Yusupov </span>
                    and
                    <span className="font-bold text-[#EC0000]"> Abduqodir Juraqulov </span>
                    who are
                    <span className="font-bold text-[#EC0000]"> MDIST graduates. </span>
                </p>

                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    Our company has taught more than
                    <span className="font-bold text-[#EC0000]"> 2000 students </span>
                    so far and made a huge number of IELTS results with its students,
                    <span className="font-bold text-[#EC0000]"> 7.0+ band scores on average. </span>
                </p>

                <p
                    data-aos='zoom-in'
                    className="font-[Montserrat] text-[#222222] font-normal leading-[120%] text-center">
                    The name "Founders" is not just about two friends, but also it is our
                    <span className="font-bold text-[#EC0000]"> motivated </span>
                    and
                    <span className="font-bold text-[#EC0000]"> passionate </span>
                    <span className="font-bold text-[#EC0000]"> students </span>
                    who will become future
                    <span className="font-bold text-[#EC0000]"> leaders </span>
                    and
                    <span className="font-bold text-[#EC0000]"> founders </span>
                    of successful companies.
                </p>
            </div>

        </div>
    )
}

export default About