import { useState, useEffect, useRef } from "react";
import Teacher1 from "/src/assets/tech1.avif";
import Teacher2 from "/src/assets/tech2.avif";
import Teacher3 from "/src/assets/tech3.avif";
import Teacher4 from "/src/assets/tech4.avif";
import Teacher5 from "/src/assets/tech5.avif";
import Teacher6 from "/src/assets/tech6.avif";
import Teacher7 from "/src/assets/tech7.avif";
import Teacher8 from "/src/assets/tech8.avif";
import Teacher9 from "/src/assets/tech9.avif";
import TeacherCard from "./component/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teachersData = [
    { img: Teacher1, teacher: "Iskhakova Leyla", Experience: "4 years+", IELTS: "7.0", position: "ESL Teacher | IELTS Instructor" },
    { img: Teacher2, teacher: "Kambarova Omina", Experience: "2 years+", position: "ESL Teacher" },
    { img: Teacher3, teacher: "Yusupov Bunyodbek", Experience: "1 years+", IELTS: "7.5", position: "ESL Teacher" },
    { img: Teacher4, teacher: "Abdumalikova Parizoda", Experience: "7 years+", position: "ESL Teacher" },
    { img: Teacher5, teacher: "Asadova Zarina", Experience: "15 years+", position: "Senior ESL Teacher" },
    { img: Teacher6, teacher: "Karajanova Kamila", Experience: "2.5 years+", position: "ESL Teacher" },
    { img: Teacher7, teacher: "Abatbaeva Sarbina", Experience: "2.5 years+", IELTS: "7.0", position: "ESL Teacher" },
    { img: Teacher8, teacher: "Soatmurodova Dinora", Experience: "2.5 years+", IELTS: "7.5", position: "ESL Teacher" },
    { img: Teacher9, teacher: "Zikrullayeva Sarvinoz", IELTS: "7.5", Experience: "1.5 years+", position: "ESL Teacher" },
];

function Teachers() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const transitionRef = useRef(true);
    const startX = useRef(0);
    const isDragging = useRef(false);

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
            if (!isDragging.current) {
                transitionRef.current = true;
                setCurrentIndex((prev) => (prev + 1) % teachersData.length);
            }
        }, 300000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex < 0) {
            setTimeout(() => {
                transitionRef.current = false;
                setCurrentIndex(teachersData.length - 1);
            }, 0);
        } else {
            transitionRef.current = true;
        }
    }, [currentIndex]);

    const goNext = () => {
        transitionRef.current = true;
        setCurrentIndex((prev) => (prev + 1) % teachersData.length);
    };

    const goPrev = () => {
        transitionRef.current = true;
        setCurrentIndex((prev) => (prev - 1 + teachersData.length) % teachersData.length);
    };

    const handleStart = (clientX) => {
        isDragging.current = true;
        startX.current = clientX;
    };

    const handleMove = (clientX) => {
        if (!isDragging.current) return;
        const diff = startX.current - clientX;
        if (Math.abs(diff) > 50) {
            transitionRef.current = true;
            setCurrentIndex((prev) => prev + (diff > 0 ? 1 : -1));
            isDragging.current = false;
        }
    };

    const handleEnd = () => {
        isDragging.current = false;
    };

    return (
        <div id='teachers' className="text-center relative">
            <h1 className="text-[#EC0000] font-bold text-3xl sm:text-6xl xl:text-[80px] tracking-normal font-[Aquire]">
                O‘qituvchilarimiz:
            </h1>
            <div className="relative mt-8">
                <button
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full z-10 max-[450px]:hidden"
                    onClick={goPrev}>
                    <ChevronLeft size={24} />
                </button>
                <div
                    className="overflow-hidden"
                    onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                    onTouchEnd={handleEnd}
                    onMouseDown={(e) => handleStart(e.clientX)}
                    onMouseMove={(e) => handleMove(e.clientX)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}>
                    <div className="flex my-5" style={{
                        transform: `translateX(-${(currentIndex * (100 / slidesToShow))}%)`,
                        transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none"
                    }}>
                        {[...teachersData, ...teachersData].map((item, index) => {
                            const centerIndex = (currentIndex + Math.floor(slidesToShow / 2)) % teachersData.length;
                            const isActive = index % teachersData.length === centerIndex;

                            return (
                                <div
                                    key={index}
                                    className={`flex-none px-3 transition-transform duration-300 ease-in-out ${isActive ? "min-[768px]:scale-110" : "min-[768px]:scale-100"
                                        }`}
                                    style={{ width: `${100 / slidesToShow}%` }}
                                >
                                    <TeacherCard {...item} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full z-10 max-[450px]:hidden"
                    onClick={goNext}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}

export default Teachers;