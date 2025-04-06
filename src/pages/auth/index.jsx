import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RegistrationForm() {
    const { t, i18n } = useTranslation()
    const ChangeLng = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage)
        localStorage.setItem('i18nextLng', selectedLanguage)
    }
    const regions = {
        [t("Toshkent shahar")]: [
            t("Bektemir"),
            t("Chilonzor"),
            t("Hamza"),
            t("Mirobod"),
            t("Mirzo Ulugʻbek"),
            t("Sergeli"),
            t("Shayxontohur"),
            t("Olmazor"),
            t("Uchtepa"),
            t("Yakkasaroy"),
            t("Yunusobod"),
            t("Yangihayot"),
        ],
        [t("Sirdaryo")]: [],
        [t("Navoiy")]: [],
        [t("Jizzax")]: [],
        [t("Xorazm")]: [],
        [t("Buxoro")]: [],
        [t("Surxondaryo")]: [],
        [t("Namangan")]: [],
        [t("Andijon")]: [],
        [t("Qashqadaryo")]: [],
        [t("Samarqand")]: [],
        [t("Fargʻona")]: [],
        [t("Toshkent viloyati")]: [],
        [t("Qoraqalpogʻiston")]: []
    };


    const [selectedRegion, setSelectedRegion] = useState("");

    return (
        <div className="max-w-lg mx-auto my-25 p-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white sm:p-8 max-[450px]:mx-[10px] lg:p-10" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left max-[450px]:text-2xl">{t("Birinchi darsga yoziling!")}</h1>
            <form className="space-y-6">
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Ism")}:</label>
                    <input
                        type="text"
                        placeholder={t("Ismingizni kiriting")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                        pattern="[A-Za-z\s]+"
                        title="Only letters and spaces are allowed."
                    />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Telefon raqam")}:</label>
                    <input
                        type="text"
                        placeholder="+998 90 123 45 67"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                        inputMode="tel"
                        pattern="\+998\s[0-9]{2}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}"
                        title="Enter a valid phone number (e.g., +998 90 123 45 67)"
                    />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Bizni qayerdan eshitdingiz?")}</label>
                    <input
                        type="text"
                        placeholder={t("Telegram, Instagram, YouTube...")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                        pattern="[A-Za-z\s,]+"
                        title="Only letters, spaces, and commas are allowed."
                    />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Ingliz tili bo’yicha muammoingiz")}:</label>
                    <input
                        type="text"
                        placeholder={t("Muammoingizni yozing")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                        pattern="[A-Za-z\s,]+"
                        title="Only letters, spaces, and commas are allowed."
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Viloyatingiz")}:</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" onChange={(e) => setSelectedRegion(e.target.value)}>
                            <option value="">{t("Viloyatingizni tanlang")}</option>
                            {Object.keys(regions).map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    {selectedRegion && regions[selectedRegion].length > 0 && (
                        <div>
                            <label className="block text-[#616161] font-semibold text-lg mb-2">{t("Tumaningiz")}:</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none">
                                <option value="">{t("Tumaningizni tanlang")}</option>
                                {regions[selectedRegion].map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </form>

            <div className="w-full mt-6">
                <p className="mb-4 font-semibold text-[#616161] text-lg">{t("Darajangizni tanlang")}:</p>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                    <a href='/kids' className="w-full px-6 py-3 bg-[#EC0000] text-center text-white rounded-lg hover:bg-red-600">{t("Kids")}</a>
                    <a href="/general" className="w-full px-6 py-3 text-center bg-[#EC0000] text-white rounded-lg hover:bg-red-600">{t("Kids")}</a>
                </div>
            </div>
        </div>
    );
}
