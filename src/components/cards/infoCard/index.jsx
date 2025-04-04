import Aos from "aos";
import { useEffect } from "react";

const collectionsData = [
    { num: "3+", title: "Yillik tajriba" },
    { num: "2 000+", title: "Mamnun o‘quvchilar" },
    { num: "50+", title: "Ijobiy IELTS natijalari" },
    { num: "100+", title: "Hodimlar soni" },
];

function InfoCard() {
    useEffect(() => {
        Aos.init({
            duration: 800,
        });
        Aos.refresh();
    }, []);

    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[10px] px-[100px] py-[30px] mb-[60px] max-[480px]:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] max-[480px]:mb-[40px]">
            {collectionsData.map((item, index) => (
                <div
                    key={index}
                    data-aos='zoom-in'
                    className="font-[Montserrat] relative z-0 w-full py-[30px] pl-[30px] rounded-[25px] bg-no-repeat bg-right bg-contain max-[480px]:py-[16px] max-[480px]:pl-[16px] max-[480px]:rounded-[10px] bg-[#FFB2B2]"
                    style={{ backgroundImage: "url('/src/assets/star.png')" }}
                >
                    <p className="font-bold text-[50px] text-[#EC0000] max-[480px]:text-[28px] max-[480px]:leading-[34px]">
                        {item.num}
                    </p>
                    <h4 className="font-[400] font-[Montserrat] text-[24px] text-[#000000] max-[480px]:text-[12px] max-[480px]:leading-[14px]">
                        {item.title}
                    </h4>

                </div>
            ))}
        </section>
    );
}

export default InfoCard;
