import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PerceptionTest() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = [
    {
      q: t("Biror ma'lumotni eslash uchun siz odatda:"),
      options: [
        t("A) U yozilgan daftarni yoki sahifani ko'z oldingizga keltirasiz."),
        t("B) O'sha paytda eshitilgan tovush yoki so'zlarni eslaysiz."),
        t("C) O'sha vaziyatda nima qilganingizni eslaysiz."),
      ],
      mapping: ["visual", "auditory", "kinesthetic"],
    },
    {
      q: t("Sizga yoqimli voqeani eslatadigan narsa:"),
      options: [
        t("A) Suratlar yoki videolar."),
        t("B) O'sha paytda chalinar edi deb eslaydigan qo'shiq."),
        t("C) O'sha his-tuyg'ularni yana bir bor boshdan kechirish."),
      ],
      mapping: ["visual", "auditory", "kinesthetic"],
    },
    {
      q: t("Film tomosha qilayotganda siz ko'proq e'tibor berasiz:"),
      options: [
        t("A) Tasvir sifati, chiroyli kadrlar."),
        t("B) Musiqa va ovozlar, tarjima sifati."),
        t("C) Aktyorlarning harakati va hissiyoti."),
      ],
      mapping: ["visual", "auditory", "kinesthetic"],
    },
    {
      q: t("Siz uchun eng oson eslab qolish mumkin bo'lgan narsa:"),
      options: [
        t("A) Ovoz (kimningdir ovozi)."),
        t("B) Yuzlar (odamlarning qiyofasi)."),
        t("C) Sanalar yoki raqamlar."),
      ],
      mapping: ["auditory", "visual", "visual"],
    },
    {
      q: t("Maktabda siz ma'lumotni qanday eslab qolardingiz?"),
      options: [
        t("A) Shpargalka yozib."),
        t("B) Qayta-qayta ovoz chiqarib takrorlab."),
        t("C) O'qituvchini diqqat bilan tinglab."),
      ],
      mapping: ["visual", "auditory", "auditory"],
    },
    {
      q: t("Kimnidir o'ylaganingizda, siz odatda:"),
      options: [
        t("A) Uning yuzini eslaysiz."),
        t("B) Uning ovozini eslaysiz."),
        t("C) Uning harakatlarini yoki yurish-turishini eslaysiz."),
      ],
      mapping: ["visual", "auditory", "kinesthetic"],
    },
    {
      q: t("Agar biror so'zni eslay olmasangiz, birinchi esingizga keladigan narsa:"),
      options: [
        t("A) So'zning ma'nosi."),
        t("B) Birinchi harfi."),
        t("C) So'z bilan bog'liq assotsiatsiya."),
      ],
      mapping: ["auditory", "visual", "kinesthetic"],
    },
    {
      q: t("Lug'atdan so'zni izlayotganda siz odatda:"),
      options: [
        t("A) Tezroq qidirish uchun barmog'ingizni namlaysiz."),
        t("B) So'zning o'zingizda aytmasdan, harflariga qaraysiz."),
        t("C) So'zni baland ovozda talaffuz qilasiz."),
      ],
      mapping: ["kinesthetic", "visual", "auditory"],
    },
    {
      q: t("Ishlayotganingizda yoki o'qiyotganingizda atrofdagi shovqin sizga:"),
      options: [
        t("A) Umuman xalal bermaydi."),
        t("B) Hatto yordam beradi, agar u yumshoq va ritmik bo'lsa."),
        t("C) Juda halal beradi, e'tiboringiz chalg'iydi."),
      ],
      mapping: ["kinesthetic", "auditory", "visual"],
    },
    {
      q: t("Biror ma'lumotni (masalan, sana yoki qoida) eslash uchun siz:"),
      options: [
        t("A) Uni yodlayotgan paytda nima qilganingizni eslaysiz."),
        t("B) U yozilgan qog'ozni yoki joyni ko'z oldingizga keltirasiz."),
        t("C) Yodlayotgan paytda aytgan so'zlaringizni eslaysiz."),
      ],
      mapping: ["kinesthetic", "visual", "auditory"],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ visual: 0, auditory: 0, kinesthetic: 0 });
  const [dominant, setDominant] = useState(null);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (showResult) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showResult]);

  const handleSelect = (qi, oi) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guard: require all answers and scroll to first unanswered
    const firstUnanswered = answers.findIndex((a) => a === null || a === undefined);
    if (firstUnanswered !== -1) {
      setWarning(t("Iltimos, barcha savollarga javob bering."));
      const el = document.getElementById(`perception-q-${firstUnanswered}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Compute counts by explicit per-option modality mapping
    const counts = answers.reduce(
      (acc, ans, idx) => {
        if (ans === null || ans === undefined) return acc;
        const modality = questions[idx]?.mapping?.[ans];
        if (modality && acc[modality] !== undefined) {
          acc[modality] += 1;
        }
        return acc;
      },
      { visual: 0, auditory: 0, kinesthetic: 0 }
    );
    localStorage.setItem("perceptionResult", JSON.stringify(counts));
    const registrationData = JSON.parse(localStorage.getItem("registrationData"));
    const token = "7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw";
    const chat_id = -1002585473961;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const dom = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const modalityMap = {
      visual: "Vizual (ko'rish orqali)",
      auditory: "Audial (eshitish orqali)",
      kinesthetic: "Kinestetik (harakat va his orqali)",
    };

    if (registrationData) {
      const messageContent = `
📝 ${t("Ro'yxatdan o'tish")}:
👤 ${t("Ismi")}: ${registrationData.name}
🎂 ${t("Tug'ilgan sana")}: ${registrationData.birthdate}
📞 ${t("Telefon")}: ${registrationData.phone}
📢 ${t("Qayerdan eshitdi")}: ${registrationData.heard}
❓ ${t("Muammo")}: ${registrationData.problem}
📍 ${t("Viloyat")}: ${registrationData.region}
🏙 ${t("Tuman")}: ${registrationData.district}

📊 ${t("Axborotni qabul qilish testi natijasi")}:
👁️ ${t("Vizual")}: ${counts.visual}
🎧 ${t("Audial")}: ${counts.auditory}
✋ ${t("Kinestetik")}: ${counts.kinesthetic}
⭐ ${t("Uslub")}: ${modalityMap[dom]}
`;

      axios.post(url, { chat_id, text: messageContent }).catch(() => {});
    }

    setResult(counts);
    setDominant(dom);
    setShowResult(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
      {!showResult ? (
        <>
          <h1 className="text-2xl font-bold mb-1">{t("Axborotni qabul qilish uslubi testi")}</h1>
          <p className="text-sm text-red-600 mb-2">{t("*Har bir savolda sizga eng yaqin javobni tanlang.")}</p>
          {warning && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{warning}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div id={`perception-q-${qi}`} key={qi} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">{qi + 1}. {q.q}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => handleSelect(qi, oi)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
            >
              {t("Natijani ko'rish")}
            </button>
          </form>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t("Axborotni qabul qilish testi natijasi")}</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
            <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t("Uslub")}</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                {dominant === "visual" && t("Vizual")}
                {dominant === "auditory" && t("Audial")}
                {dominant === "kinesthetic" && t("Kinestetik")}
              </p>
            </div>
            <div className="space-y-4 mb-6">
              {[
                { key: "visual", label: t("Vizual"), icon: "👁️", color: "from-blue-500 to-blue-600" },
                { key: "auditory", label: t("Audial"), icon: "🎧", color: "from-purple-500 to-purple-600" },
                { key: "kinesthetic", label: t("Kinestetik"), icon: "✋", color: "from-green-500 to-green-600" },
              ].map(({ key, label, icon, color }) => {
                const value = result[key];
                const percent = Math.round((value / questions.length) * 100);
                const isDominant = key === dominant;
                return (
                  <div 
                    key={key} 
                    className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      isDominant 
                        ? 'border-red-400 bg-red-50 shadow-lg scale-[1.02]' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between px-5 py-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icon}</span>
                        <span className={`font-semibold text-lg ${isDominant ? 'text-red-700' : 'text-gray-700'}`}>
                          {label}
                        </span>
                      </div>
                      <span className={`font-bold text-lg ${isDominant ? 'text-red-600' : 'text-gray-600'}`}>
                        {value} / {questions.length} <span className="text-sm">({percent}%)</span>
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1.5 bg-gray-100">
                      <div 
                        className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t("Back to Main Page")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
