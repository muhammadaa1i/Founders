import Aos from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import star from '../../../assets/star.png'

function InfoCard() {
    const { t, i18n } = useTranslation();

    const ChangeLng = (e) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    const collectionsData = [
        { num: "3+", title: t("Yillik tajriba") },
        { num: "2 000+", title: t("Mamnun o‘quvchilar") },
        { num: "200+", title: t("IELTS natijalari") },
        { num: "40+", title: t("Hodimlar") },
    ];

    return (
        <section className="grid grid-cols-2 gap-6 px-8 py-6 mb-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 max-sm:px-4 max-sm:py-4 max-sm:gap-4">
            {collectionsData.map((item, index) => (
                <div
                    key={index}
                    data-aos="zoom-in"
                    className="relative z-0 w-full py-8 px-6 rounded-3xl bg-no-repeat bg-right bg-contain max-sm:py-4 max-sm:px-4 max-sm:rounded-xl bg-[#ffcfcf]"
                    style={{ backgroundImage: `url(${star})` }}
                >
                    <p className="font-bold text-5xl text-[#EC0000] max-sm:text-xl max-sm:leading-7">
                        {item.num}
                    </p>
                    <h4 className="font-normal text-2xl  text-[#000000] max-sm:text-sm max-sm:leading-5">
                        {item.title}
                    </h4>
                </div>
            ))}
        </section>
    );
}

export default InfoCard;
