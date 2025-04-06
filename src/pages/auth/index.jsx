import { useState } from "react";

export default function RegistrationForm() {
    const regions = {
        "Toshkent shahar": ["Bektemir", "Chilonzor", "Hamza", "Mirobod", "Mirzo Ulugʻbek", "Sergeli", "Shayxontohur", "Olmazor", "Uchtepa", "Yakkasaroy", "Yunusobod", "Yangihayot"],
        "Sirdaryo": [],
        "Navoiy": [],
        "Jizzax": [],
        "Xorazm": [],
        "Buxoro": [],
        "Surxondaryo": [],
        "Namangan": [],
        "Andijon": [],
        "Qashqadaryo": [],
        "Samarqand": [],
        "Fargʻona": [],
        "Toshkent viloyati": [],
        "Qoraqalpogʻiston": []
    };

    const [selectedRegion, setSelectedRegion] = useState("");

    return (
        <div className="max-w-lg mx-auto my-25 p-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white sm:p-8 max-[450px]:mx-[10px] lg:p-10" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left max-[450px]:text-2xl">Birinchi darsga yoziling!</h1>
            <form className="space-y-6">
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">Ism:</label>
                    <input type="text" placeholder="Ismingizni kiriting" className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">Telefon raqam:</label>
                    <input type="number" placeholder="+998 90 123 45 67" className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">Bizni qayerdan eshitdingiz?</label>
                    <input type="text" placeholder="Telegram, Instagram, YouTube..." className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" />
                </div>
                <div>
                    <label className="block text-[#616161] font-semibold text-lg mb-2">Ingliz tili bo’yicha muammoingiz:</label>
                    <input type="text" placeholder="Muammoingizni yozing" className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" />
                </div>

                {/* Viloyat va Tuman Section */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-[#616161] font-semibold text-lg mb-2">Viloyatingiz:</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" onChange={(e) => setSelectedRegion(e.target.value)}>
                            <option value="">Viloyatingizni tanlang</option>
                            {Object.keys(regions).map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    {selectedRegion && regions[selectedRegion].length > 0 && (
                        <div>
                            <label className="block text-[#616161] font-semibold text-lg mb-2">Tumaningiz:</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none">
                                <option value="">Tumaningizni tanlang</option>
                                {regions[selectedRegion].map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </form>

            {/* Daraja Tanlash */}
            <div className="w-full mt-6">
                <p className="mb-4 font-semibold text-[#616161] text-lg">Darajangizni tanlang:</p>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                    <a href='/kids' className="w-full px-6 py-3 bg-[#EC0000] text-center text-white rounded-lg hover:bg-red-600">Kids</a>
                    <a href="/general" className="w-full px-6 py-3 text-center bg-[#EC0000] text-white rounded-lg hover:bg-red-600">General</a>
                </div>
            </div>
        </div>
    );
}
