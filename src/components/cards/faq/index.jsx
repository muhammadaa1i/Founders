import Aos from "aos";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


function FAQ() {
    const { t, i18n } = useTranslation()
    const ChangeLng = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage)
        localStorage.setItem('i18nextLng', selectedLanguage)
    }

    const faqs = [
        {
            question: t("faq.question1"),
            answer: t("faq.answer1"),
        },
        {
            question: t("faq.question2"),
            answer: t("faq.answer2"),
        },
        {
            question: t("faq.question3"),
            answer: t("faq.answer3"),
        },
        {
            question: t("faq.question4"),
            answer: t("faq.answer4"),
        },
        {
            question: t("faq.question5"),
            answer: t("faq.answer5"),
        },
        {
            question: t("faq.question6"),
            answer: t("faq.answer6"),
        },
        {
            question: t("faq.question7"),
            answer: t("faq.answer7"),
        },
    ];

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
        <div id="faq" className="w-full  px-[40px] xl:px-[100px] md:px-[80px] sm:px-[60px] max-[450px]:px-2 mb-[100px] mt-8">
            <h2
                data-aos='fade-up'
                className="py-[30px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-4xl xl:text-[50px] leading-[100%] tracking-normal text-center">{t("FAQ")}</h2>
            <h3
                data-aos='fade-up'
                className="font-medium text-2xl md:text-3xl 2xl:text-4xl font-[Montserrat] text-center mb-8">{t("Ko‘p beriladigan savollarga javob beramiz!")}</h3>


            <div
                data-aos="zoom-in"
                className="px-[30px] py-[15px] border-2 border-[#EC0000] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.35)]"
            >
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-[red] mb-4 last:border-b-0"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                        >
                            <span className="text-[22px]  tracking-[0%] font-[500] leading-8 font-[Montserrat]">
                                {faq.question}
                            </span>
                            <span className="text-[16px] sm:text-xl xl:text-2xl ">
                                <i
                                    className={`fa-solid ${openIndex === index ? "fa-chevron-up" : "fa-chevron-down"
                                        } bg-red-600 text-amber-50 p-[5px] rounded-full`}
                                ></i>
                            </span>
                        </button>
                        {openIndex === index && (
                            <p className="pb-4 text-[#4B5563] font-[Montserrat] font-[400] text-[16px] leading-6 tracking-[0%]">
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
