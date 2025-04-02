import Aos from "aos";
import { useEffect } from "react";
import Button from "../../../button";

function CourseCard({
    title,
    img,
    courseTime,
    teacherBold,
    teacher,
    spanTitleBold,
    spanTitle,
    spanParagrfBold,
    spanParagrf,
    cabinetBold,
    cabinet,
    timeBold,
}) {


    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    return (
        <div
            data-aos='zoom-in'
            className="main-card flex flex-col gap-3 md:gap-7 mx-auto max-[500px]:mx-2 px-4 py-4 md:px-6 md:py-10 max-w-[400px] min-h-[500px] bg-white rounded-[15px] border-2 border-[#EC0000] transition-all duration-500 ease-in-out hover:scale-[1.05] hover:shadow-[0px_15px_25px_rgba(255,0,0,0.25),inset_0px_8px_15px_rgba(255,0,0,0.3)] text-left">
            <div className="flex items-center gap-4 mb-3">
                <img
                    src={img}
                    alt="Image"
                    className="rounded-full w-[60px] h-[60px] object-cover lazyload"
                />
                <h2 className="text-[24px] md:text-[40px] leading-[100%] tracking-normal text-[#2c3e50] font-bold montserrat_font_700">
                    {title}
                </h2>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <i className="fa-regular fa-circle-check text-red-700 mt-3 text-xl md:text-2xl"></i>
                    <p className="montserrat_font_400 leading-6 text-[16px] md:text-xl">
                        <b className="text-[#222222]">{timeBold}</b>
                        {courseTime}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <i className="fa-regular fa-circle-check text-red-700 mt-3 text-xl md:text-2xl"></i>
                    <p className="montserrat_font_400 leading-6 text-[16px] md:text-xl">
                        <b className="text-[#222222] font-bold">{teacherBold}</b>
                        {teacher}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <i className="fa-regular fa-circle-check text-red-700 mt-3 text-xl md:text-2xl"></i>
                    <p className="montserrat_font_400 leading-6 text-[16px] md:text-xl">
                        <b className="text-[#222222] font-bold">{spanTitleBold}</b>
                        {spanTitle}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <i className="fa-regular fa-circle-check text-red-700 mt-3 text-xl md:text-2xl"></i>
                    <p className="montserrat_font_400 leading-6 text-[16px] md:text-xl">
                        <b className="text-[#222222] font-bold">{spanParagrfBold}</b>
                        {spanParagrf}
                    </p>
                </div>

                <div className="flex items-start gap-3">
                    <i className="fa-regular fa-circle-check text-red-700 mt-3 text-xl md:text-2xl"></i>
                    <p className="montserrat_font_400 leading-6 text-[16px] md:text-xl">
                        <span className="text-[#222222] font-bold">{cabinetBold}</span>
                        {cabinet}
                    </p>
                </div>
            </div>

            <div className="mt-auto">
                <Button to="/registration">Birinchi darsga yozilish</Button>
            </div>
        </div>
    );
}

export default CourseCard;

