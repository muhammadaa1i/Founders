import Aos from "aos";
import { useEffect, useState } from "react";

const faqs = [
    {
        question: "Ingliz tilini noldan qancha muddatda o‘rganish mumkin?",
        answer:
            "Bu o‘quvchining darajasi va mashg‘ulotga ajratadigan vaqti, shuningdek, individual qobiliyatiga bog‘liq bo‘ladi. Odatda, kundalik shug‘ullanish bilan 6-12 oy ichida sezilarli natijalarga erishish mumkin.",
    },
    {
        question: "Darslar qanday formatda o‘tiladi?",
        answer:
            "Kurslar oflayn va onlayn formatda bo‘lishi mumkin. Darslarda gapirish, yozish, tinglab tushunish va grammatikani o‘rganish bo‘yicha mashg‘ulotlar olib boriladi.",
    },
    {
        question: "O'quv markazda kimlar dars beradi?",
        answer:
            "O‘qituvchilar tajribali va maxsus sertifikatga ega mutaxassislardir. Ularning IELTS sertifikatidan tashqari xalqaro TESOL/TEFL sertifikatlari ham mavjud.",
    },
    {
        question: "Darslarga qanday yozilish mumkin?",
        answer:
            "Markazga kelib ro‘yxatdan o‘tish yoki onlayn tarzda anketa to‘ldirish orqali kursga yozilish mumkin.",
    },
    {
        question: "Darslar nechta kishilik guruhlarda o‘tiladi?",
        answer:
            "Odatda, guruhda 6-12 kishi bo‘ladi. Bundan tashqari, individual darslar ham mavjud.",
    },
    {
        question: "Boshlang‘ich darajadan boshlab o‘qiy olamanmi?",
        answer:
            "Ha, kurslar barcha darajalar uchun moslashtirilgan va boshlang‘ich darajadan o‘qishni boshlashingiz mumkin.",
    },
    {
        question: "Necha yoshdan kurslarga yozilsa bo'ladi?",
        answer:
            "Kurslarimizga 7 yoshdan boshlab yozilsa bo'ladi va bizda yosh kategoriyasi chegaralanmagan.",
    },
];

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    return (
        <div id="faq" className="w-full  px-[30px] max-[450px]:px-2 mb-[100px] mt-8">
            <h2
                data-aos='fade-up'
                className="font-bold text-center text-3xl sm:text-6xl xl:text-[80px] font-[Aquire] text-[#EC0000]">FAQ</h2>
            <h3
                data-aos='fade-up'
                className="font-medium text-2xl md:text-4xl 2xl:text-5xl font-[Montserrat] text-center mb-8">Ko‘p beriladigan savollarga javob beramiz!</h3>
          

             <div
                data-aos="zoom-in"
                className="px-[30px] py-[15px] border-2 border-[#EC0000] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.35)]"
            >
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-[red] mb-4 last:border-b-0" // ✅ This removes border from the last item
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                        >
                            <span className="text-[24px] leading-[100%] tracking-[0%] font-[500] font-[Montserrat]">
                                {faq.question}
                            </span>
                            <span className="text-[16px] sm:text-xl xl:text-2xl">
                                <i
                                    className={`fa-solid ${openIndex === index ? "fa-chevron-up" : "fa-chevron-down"
                                        } bg-red-600 text-amber-50 p-[5px] rounded-full`}
                                ></i>
                            </span>
                        </button>
                        {openIndex === index && (
                            <p className="pb-4 text-[#4B5563] font-[Montserrat] font-[400] text-[16px] leading-[100%] tracking-[0%]">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div> 

        </div>
    );
}

export default FAQ;
