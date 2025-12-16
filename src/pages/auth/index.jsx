import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IMask from 'imask';

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
            t("Yashnobod"),
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
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedTestType, setSelectedTestType] = useState("");
    const navigate = useNavigate();

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict("");
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const Sendmessage = (e, level) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const heard = document.getElementById("heard").value.trim();
        const problem = document.getElementById("problem").value.trim();
        const birthdate = document.getElementById("birthdate").value.trim();

        // Validate all required fields
        if (!name || !phone || !heard || !problem || !selectedRegion || !birthdate) {
            toast.error(t("Iltimos, barcha maydonlarni to'ldiring."));
            return;
        }

        // Validate birthdate format
        if (birthdate.length !== 10 || !/^\d{2}\/\d{2}\/\d{4}$/.test(birthdate)) {
            toast.error(t("Iltimos, to'g'ri tug'ilgan sanani kiriting (kk/oo/yyyy)."));
            return;
        }

        // Validate test type is selected
        if (!selectedTestType) {
            toast.error(t("Iltimos, test turini tanlang."));
            return;
        }

        const data = {
            name: name,
            phone: phone,
            heard: heard,
            problem: problem,
            region: selectedRegion,
            district: selectedDistrict,
            birthdate,
        };

        localStorage.setItem("registrationData", JSON.stringify(data));
        if (selectedTestType) {
            localStorage.setItem("selectedTestType", selectedTestType);
        }
        if (selectedTestType === "perception") {
            navigate("/perception");
        } else if (selectedTestType === "temperament") {
            navigate(selectedLevel === "kids" ? "/temperament" : "/temperament-general");
        } else if (selectedTestType === "iq") {
            navigate(selectedLevel === "kids" ? "/iq-kids" : "/iq-general");
        } else {
            navigate(`/${level}`);
        }
    };

    const handleChooseLevel = (e, level) => {
        e.preventDefault();
        setSelectedLevel(level);
    };

    useEffect(() => {
        const birthdateInput = document.getElementById('birthdate');
        if (birthdateInput) {
            console.log("Applying IMask...");
            IMask(birthdateInput, { mask: '00/00/0000' });
        }
    }, []);

    return (
        <div className="max-w-lg mx-auto my-25 p-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white sm:p-8 max-[450px]:mx-[10px] lg:p-10" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left max-[450px]:text-2xl">{t("Birinchi darsga yoziling!")}</h1>
            <form
                id="myForm"
                onSubmit={Sendmessage}
                className="space-y-6">
                <div>
                    <label className="block] font-semibold text-lg mb-2">{t("Ism")}:</label>
                    <input
                        required
                        id="name"
                        type="text"
                        placeholder={t("Ismingizni kiriting")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black"
                        pattern="[A-Za-z\s]+"
                        title="Only letters and spaces are allowed."
                    />
                </div>
                <div>
                    <label className="block font-semibold text-lg mb-2">
                        {t("Tug'ilgan sanangiz")}:
                    </label>
                    <input
                        required
                        id="birthdate"
                        type="text"
                        placeholder={t("kk/oo/yyyy")}
                        pattern="\d{2}/\d{2}/\d{4}"
                        minLength="10"
                        maxLength="10"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black value-black"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-lg mb-2">{t("Telefon raqam")}:</label>
                    <input
                        required
                        id="phone"
                        type="number"
                        placeholder="+998 90 123 45 67"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black"
                        inputMode="tel"
                        pattern="\+998\[0-9]{2}\[0-9]{3}\[0-9]{2}\[0-9]{2}"
                        title="Enter a valid phone number (e.g., +998 90 123 45 67)"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-lg mb-2">{t("Bizni qayerdan eshitdingiz?")}</label>
                    <input
                        required
                        id="heard"
                        type="text"
                        placeholder={t("Telegram, Instagram, YouTube...")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black"
                        pattern="[A-Za-z\s,]+"
                        title="Only letters, spaces, and commas are allowed."
                    />
                </div>
                <div>
                    <label className="block font-semibold text-lg mb-2">{t("Ingliz tili bo’yicha muammoingiz")}:</label>
                    <input
                        required
                        id="problem"
                        type="text"
                        placeholder={t("Muammoingizni yozing")}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black"
                        pattern="[A-Za-z\s,]+"
                        title="Only letters, spaces, and commas are allowed."
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold text-lg mb-2">{t("Viloyatingiz")}:</label>
                        <select
                            required
                            id="region"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none placeholder-black"
                            onChange={handleRegionChange}
                        >
                            <option value="">{t("Viloyatingizni tanlang")}</option>
                            {Object.keys(regions).map((region, index) => (
                                <option id="region" key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    {selectedRegion && regions[selectedRegion]?.length > 0 && (
                        <div>
                            <label className="block font-semibold text-lg mb-2">{t("Tumaningiz")}:</label>
                            <select
                                required
                                id="district"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                                onChange={handleDistrictChange}
                            >
                                <option value="">{t("Tumaningizni tanlang")}</option>
                                {regions[selectedRegion].map((district, index) => (
                                    <option id="district" key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="w-full mt-6">
                    <p className="mb-4 font-semibold text-lg">{t("Darajangizni tanlang")}:</p>
                    {!selectedLevel ? (
                        <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                            <button
                                type="button"
                                className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
                                onClick={(e) => handleChooseLevel(e, "kids")}
                            >
                                {t("Kids")}
                            </button>
                            <button
                                type="button"
                                className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
                                onClick={(e) => handleChooseLevel(e, "general")}
                            >
                                {t("General")}
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex">
                            <button
                                type="button"
                                className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg cursor-default"
                                disabled
                            >
                                {t(selectedLevel === "kids" ? "Kids" : "General")}
                            </button>
                        </div>
                    )}

                    {selectedLevel && (
                        <div className="mt-4 space-y-3">
                            <label className="block font-semibold text-lg mb-2">
                                {t("Test turini tanlang")}:
                            </label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none"
                                value={selectedTestType}
                                onChange={(e) => setSelectedTestType(e.target.value)}
                            >
                                <option value="">{t("Test turini tanlang")}</option>
                                <option value="level">{t("Darajangizni tekshirish")}</option>
                                <option value="temperament">{t("Temperamentingizni tekshirish")}</option>
                                <option value="perception">{t("Axborotni qabul qilish")}</option>
                                <option value="iq">{t("IQni tekshirish")}</option>
                            </select>
                            <button
                                type="button"
                                className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
                                onClick={(e) => {
                                    if (!selectedTestType) {
                                        toast.error(t("Iltimos, barcha maydonlarni to'ldiring."));
                                        return;
                                    }
                                    Sendmessage(e, selectedLevel);
                                }}
                            >
                                {t("Testni boshlash")}
                            </button>
                        </div>
                    )}
                </div>

            </form>
            <ToastContainer position="top-center" />
        </div>
    );
}
