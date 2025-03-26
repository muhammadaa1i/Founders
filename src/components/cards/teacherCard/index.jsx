import { useState, useEffect, useRef } from "react";
import Teacher1 from "/src/assets/tech1.png";
import Teacher2 from "/src/assets/tech2.png";
import Teacher3 from "/src/assets/tech3.png";
import Teacher4 from "/src/assets/tech4.png";
import Teacher5 from "/src/assets/tech5.png";
import Teacher6 from "/src/assets/tech6.png";
import Teacher7 from "/src/assets/tech7.png";
import Teacher8 from "/src/assets/tech8.png";
import Teacher9 from "/src/assets/tech9.png";
import TeacherCard from "./component/index";

const teachersData = [
    { img: Teacher1, teacher: "Iskhakova Leyla", Experience: "4 years+", IELTS: "7.0", position: "ESL Teacher | IELTS Instructor" },
    { img: Teacher2, teacher: "Kambarova Omina", Experience: "2 years+", position: "ESL Teacher" },
    { img: Teacher3, teacher: "Yusupov Bunyodbek", Experience: "1 years+", IELTS: "7.5", position: "ESL Teacher" },
    { img: Teacher4, teacher: "Abdumalikova Parizoda", Experience: "7 years+", position: "ESL Teacher" },
    { img: Teacher5, teacher: "Asadova Zarina", Experience: "15 years+", position: "Senior ESL Teacher" },
    { img: Teacher6, teacher: "Karajanova Kamila", Experience: "2.5 years+", position: "ESL Teacher" },
    { img: Teacher7, teacher: "Abatbaeva Sarbina", Experience: "2.5 years+", IELTS: "7.0", position: "ESL Teacher" },
    { img: Teacher8, teacher: "Soatmurodova Dinora", Experience: "2.5 years+", IELTS: "7.5", position: "ESL Teacher" },
    { img: Teacher9, teacher: "Yusupova Sarvinoz", IELTS: "7.5", Experience: "1.5 years+", position: "ESL Teacher" },
];

function Teachers() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const containerRef = useRef(null);
    const transitionRef = useRef(true);

    useEffect(() => {
        const updateSlidesToShow = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 768) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };
        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);
        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            transitionRef.current = true;
            setCurrentIndex((prev) => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex >= teachersData.length) {
            setTimeout(() => {
                transitionRef.current = false;
                setCurrentIndex(0);
            }, 500);
        }
    }, [currentIndex]);

    return (
        <div id='teachers' className="text-center relative">
            <h1 className="text-[#EC0000] font-bold text-3xl sm:text-6xl xl:text-[80px] tracking-normal font-[Aquire]">
                O‘qituvchilarimiz:
            </h1>
            <div className="overflow-hidden mt-8">
                <div className="flex" style={{
                    transform: `translateX(-${(currentIndex * (100 / slidesToShow))}%)`,
                    transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none"
                }}>
                    {[...teachersData, ...teachersData].map((item, index) => (
                        <div key={index} className="flex-none px-2" style={{ width: `${100 / slidesToShow}%` }}>
                            <TeacherCard {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Teachers;
