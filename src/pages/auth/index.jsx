import { useState } from "react";

export default function RegistrationForm() {
    const regions = {
        "Toshkent shahar": ["Bektemir", "Chilonzor", "Hamza", "Mirobod", "Mirzo Ulugʻbek", "Sergeli", "Shayxontohur", "Olmazor", "Uchtepa", "Yakkasaroy", "Yunusobod", "Yangihayot"],
        "Sirdaryo": ["Oqoltin", "Boyovut", "Guliston", "Xovos", "Mirzaobod", "Sayxunobod", "Sardoba", "Sirdaryo"],
        "Navoiy": ["Konimex", "Karmana", "Qiziltepa", "Xatirchi", "Navbahor", "Nurota", "Tomdi", "Uchquduq"],
        "Jizzax": ["Arnasoy", "Baxmal", "Doʻstlik", "Forish", "Gʻallaorol", "Sharof Rashidov", "Mirzachoʻl", "Paxtakor", "Yangiobod", "Zomin", "Zafarobod", "Zarbdor"],
        "Xorazm": ["Bogʻot", "Gurlan", "Xonqa", "Hazorasp", "Xiva", "Qoʻshkoʻpir", "Shovot", "Urganch", "Yangiariq", "Yangibozor", "Tuproqqalʼa"],
        "Buxoro": ["Aloq", "Buxoro", "Gʻijduvon", "Jondor", "Kogon", "Qorakoʻl", "Qorovulbozor", "Peshku", "Romitan", "Shofirkon", "Vobkent"],
        "Surxondaryo": ["Angor", "Boysun", "Denov", "Jarqoʻrgʻon", "Qiziriq", "Qumqoʻrgʻon", "Muzrabot", "Oltinsoy", "Sariosiyo", "Sherobod", "Shoʻrchi", "Termiz", "Uzun", "Bandixon"],
        "Namangan": ["Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Namangan", "Norin", "Pop", "Toʻraqoʻrgʻon", "Uchqoʻrgʻon", "Uychi", "Yangiqoʻrgʻon"],
        "Andijon": ["Andijon", "Asaka", "Baliqchi", "Boʻston", "Buloqboshi", "Izboskan", "Jalaquduq", "Xoʻjaobod", "Qoʻrgʻontepa", "Marhamat", "Oltinkoʻl", "Paxtaobod", "Shahrixon", "Ulugʻnor"],
        "Qashqadaryo": ["Chiroqchi", "Dehqonobod", "Gʻuzor", "Qamashi", "Qarshi", "Koson", "Kasbi", "Kitob", "Mirishkor", "Muborak", "Nishon", "Shahrisabz", "Yakkabogʻ", "Koʻkdala"],
        "Samarqand": ["Bulungʻur", "Ishtixon", "Jomboy", "Kattaqoʻrgʻon", "Qoʻshrabot", "Narpay", "Nurobod", "Oqdaryo", "Paxtachi", "Payariq", "Pastdargʻom", "Samarqand", "Toyloq", "Urgut"],
        "Fargʻona": ["Oltiariq", "Bagʻdod", "Beshariq", "Buvayda", "Dangʻara", "Fargʻona", "Furqat", "Qoʻshtepa", "Quva", "Rishton", "Soʻx", "Toshloq", "Uchkoʻprik", "Oʻzbekiston", "Yozyovon"],
        "Toshkent viloyati": ["Bekobod", "Boʻstonliq", "Boʻka", "Chinoz", "Qibray", "Ohangaron", "Oqqoʻrgʻon", "Parkent", "Piskent", "Quyi Chirchiq", "Oʻrta Chirchiq", "Yangiyoʻl", "Yuqori Chirchiq", "Zangiota"],
        "Qoraqalpogʻiston": ["Amudaryo", "Beruniy", "Chimboy", "Ellikqalʼa", "Kegeyli", "Moʻynoq", "Nukus", "Qanlikoʻl", "Qoʻngʻirot", "Qoraoʻzak", "Shumanay", "Taxtakoʻpir", "Toʻrtkoʻl", "Xoʻjayli", "Taxiatosh", "Boʻzatov"]
    };

    const [selectedRegion, setSelectedRegion] = useState("");

    return (
        <div className="max-w-lg  mx-auto my-25 p-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white sm:p-8 max-[450px]:mx-[10px]  lg:p-10" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
            <h1 className="text-3xl font-bold  mb-6 max-[450px]:text-center max-[450px]:text-2xl ">Birinchi darsga yoziling!</h1>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#616161] font-semibold text-lg mb-2">Viloyatingiz:</label>
                        <select className="w-full  p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none" onChange={(e) => setSelectedRegion(e.target.value)}>
                            <option value="">Viloyatingizni tanlang</option>
                            {Object.keys(regions).map((region, index) => (
                                <option className=" p-[10px]" key={index} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#616161] font-semibold text-lg mb-2">Tumaningiz:</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg bg-[#FFB2B2] outline-none">
                            <option value="">Tumaningizni tanlang</option>
                            {selectedRegion && regions[selectedRegion].map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className="w-[100%] mt-6">
                <p className="mb-4 font-semibold text-[#616161] text-lg ">Darajangizni tanlang:</p>
                <div className="w-[100%] flex flex-col sm:flex-row justify-between gap-4">
                    <button className="w-full  px-6 py-3 bg-[#EC0000] text-white rounded-lg hover:bg-red-600">Kids</button>
                    <button className="w-full  px-6 py-3 bg-[#EC0000] text-white rounded-lg hover:bg-red-600">General</button>
                </div>
            </div>
        </div>
    );
}