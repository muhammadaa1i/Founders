import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mapping: A=Choleric, B=Sanguine, C=Phlegmatic, D=Melancholic
const CHOLERIC = "choleric";
const SANGUINE = "sanguine";
const PHLEGMATIC = "phlegmatic";
const MELANCHOLIC = "melancholic";

export default function TemperamentTest() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = [
    {
      q: t("Men ko'proq o'zimni quyidagicha tutaman:"),
      options: [
        t("A) Tez harakat qilaman, qizg'inman"),
        t("B) Quvnoqman, hamma bilan tez til topishaman"),
        t("C) Tinch va osoyishta yuraman"),
        t("D) Sokinman, kamgapman, mulohazalim"),
      ],
    },
    {
      q: t("Yangi vaziyatda odatda qanday bo'lasiz?"),
      options: [
        t("A) Tashabbuskor, tez javob beraman"),
        t("B) Ko'p kulaman va hazil qilaman"),
        t("C) Avval kuzataman, keyin qatnashaman"),
        t("D) O'zimni tortaman, ehtiyotkor bo'laman"),
      ],
    },
    {
      q: t("Bo'sh vaqtingizni qanday o'tkazasiz?"),
      options: [
        t("A) Harakat va musobaqalarni yoqtiraman"),
        t("B) Do'stlar bilan suhbat va o'yinlarni yoqtiraman"),
        t("C) Tinch o'yinlar va kitob o'qishni yoqtiraman"),
        t("D) Yakka holda o'ylab, rasm chizishni yoqtiraman"),
      ],
    },
    {
      q: t("Qiyin vaziyatda qanday reaksiya qilasiz?"),
      options: [
        t("A) Tez qaror qabul qilib, harakat qilaman"),
        t("B) Boshqalar bilan maslahatlashaman"),
        t("C) Vaziyatni sokin tahlil qilaman"),
        t("D) Ko'proq tashvishlanaman, o'ylab qolaman"),
      ],
    },
    {
      q: t("Jamoada o'zingizni qanday tutasiz?"),
      options: [
        t("A) Yetakchilikni qo'lga olaman"),
        t("B) Barchani ruhlantiraman"),
        t("C) Tinchlikni saqlab, kelishuv topaman"),
        t("D) Vazifani sifatli va sinchiklab bajaraman"),
      ],
    },
    {
      q: t("Ko'p kutish kerak bo'lsa:"),
      options: [
        t("A) Sabrsizlanaman"),
        t("B) O'zimni boshqa narsa bilan chalg'itaman"),
        t("C) Sabr qilaman"),
        t("D) Asabiylashaman"),
      ],
    },
    {
      q: t("Noto'g'ri ish ko'rsangiz:"),
      options: [
        t("A) Darhol e'tiroz bildiraman"),
        t("B) Yaxshi vaqtni kutib, muloyim gapiraman"),
        t("C) Jim kuzataman"),
        t("D) G'amgin bo'laman, lekin gapirmayman"),
      ],
    },
    {
      q: t("Tartib-intizom haqida:"),
      options: [
        t("A) Tez-tez qoidalarni buzib qo'yaman"),
        t("B) Qoidalar mos bo'lsa, zo'r"),
        t("C) Qoidalarga osongina rioya qilaman"),
        t("D) Juda sinchkovman, hammasi reja bo'yicha bo'lsin"),
      ],
    },
    {
      q: t("Yutqazganingizda"),
      options: [
        t("A) Qayta urinishni xohlayman"),
        t("B) Hazil bilan qabul qilaman"),
        t("C) Xotirjam qabul qilaman"),
        t("D) Uzoq vaqt xafa bo'lib yuraman"),
      ],
    },
    {
      q: t("Do'stlaringiz sizni ko'proq qanday ta'riflaydi?"),
      options: [
        t("A) Dadil va energiyali"),
        t("B) Quvnoq va samimiy"),
        t("C) Tinch va ishonchli"),
        t("D) Mulohazali va sezgir"),
      ],
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [incomplete, setIncomplete] = useState(false);
  const questionRefs = useRef([]);

  useEffect(() => {
    if (showResult) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResult]);

  const mapIndexToType = (oi) => {
    if (oi === 0) return CHOLERIC;
    if (oi === 1) return SANGUINE;
    if (oi === 2) return PHLEGMATIC;
    return MELANCHOLIC;
  };

  const handleSelect = (qi, oi) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((a) => a === null)) {
      setIncomplete(true);
      const firstIdx = answers.findIndex((a) => a === null);
      const el = questionRefs.current[firstIdx];
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setIncomplete(false);

    const counts = answers.reduce(
      (acc, ans) => {
        const k = mapIndexToType(ans);
        if (k) acc[k] += 1;
        return acc;
      },
      { [CHOLERIC]: 0, [SANGUINE]: 0, [PHLEGMATIC]: 0, [MELANCHOLIC]: 0 }
    );

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    localStorage.setItem("temperamentResult", JSON.stringify({ counts, dominant }));
    setResultData({ counts, dominant });
    setShowResult(true);

    const registrationData = JSON.parse(localStorage.getItem("registrationData"));
    const token = "7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw";
    const chat_id = -1002585473961;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const title = t("Temperament testi natijasi");
    const labels = {
      [CHOLERIC]: t("Xolerik"),
      [SANGUINE]: t("Sangvinik"),
      [PHLEGMATIC]: t("Flegmatik"),
      [MELANCHOLIC]: t("Melanxolik"),
    };

    if (registrationData) {
      // Collect all test results
      const levelResult = localStorage.getItem("kidsResult");
      const iqResult = localStorage.getItem("iqKidsResult");
      const perceptionResult = localStorage.getItem("perceptionResult");
      
      let messageContent = `\n📝 ${t("Ro'yxatdan o'tish")}:\n👤 ${t("Ismi")}: ${registrationData.name}\n🎂 ${t("Tug'ilgan sana")}: ${registrationData.birthdate}\n📞 ${t("Telefon")}: ${registrationData.phone}\n📢 ${t("Qayerdan eshitdi")}: ${registrationData.heard}\n❓ ${t("Muammo")}: ${registrationData.problem}\n📍 ${t("Viloyat")}: ${registrationData.region}\n🏙 ${t("Tuman")}: ${registrationData.district}\n\n`;
      
      // Add Level/IQ test result
      if (levelResult) {
        const result = JSON.parse(levelResult);
        messageContent += `📚 ${t("Darajangizni tekshirish")} (Kids):\n📊 ${t("Daraja")}: ${result.level}\n\n`;
      } else if (iqResult) {
        const result = JSON.parse(iqResult);
        messageContent += `🧠 ${t("IQ testi (Kids)")}: ${result.score}/${result.total}\n📊 ${t("Daraja")}: ${result.level}\n\n`;
      }
      
      // Add Perception test result
      if (perceptionResult) {
        const result = JSON.parse(perceptionResult);
        messageContent += `👁️ ${t("Axborotni qabul qilish uslubi testi")}:\n`;
        messageContent += `👁️ ${t("Vizual")}: ${result.visualCount}\n`;
        messageContent += `🎧 ${t("Audial")}: ${result.auditoryCount}\n`;
        messageContent += `✋ ${t("Kinestetik")}: ${result.kinestheticCount}\n`;
        messageContent += `⭐ ${t("Dominant uslub")}: ${result.dominant}\n\n`;
      }
      
      // Add Temperament test result
      messageContent += `📊 ${title}:\n🔥 ${labels[CHOLERIC]}: ${counts[CHOLERIC]}\n😊 ${labels[SANGUINE]}: ${counts[SANGUINE]}\n🌿 ${labels[PHLEGMATIC]}: ${counts[PHLEGMATIC]}\n🌧️ ${labels[MELANCHOLIC]}: ${counts[MELANCHOLIC]}\n⭐ Temperament: ${labels[dominant]}\n`;
      
      try {
        await axios.post(url, { chat_id, text: messageContent });
        // Clear all test data after sending
        localStorage.removeItem("registrationData");
        localStorage.removeItem("kidsResult");
        localStorage.removeItem("iqKidsResult");
        localStorage.removeItem("perceptionResult");
        localStorage.removeItem("temperamentResult");
        localStorage.removeItem("testFlow");
      } catch {}
    }

    // Do not navigate immediately; show results to the user
  };

  const containerClass = showResult
    ? "max-w-3xl mx-auto mt-10 mb-12 px-4 pt-6 pb-6"
    : "max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white";

  return (
    <div className={containerClass} style={!showResult ? { boxShadow: '15px 15px 40px 0px #FF00004D' } : undefined}>
      <h1 className="text-2xl font-bold mb-1">{t("Temperament testi")}</h1>
      {!showResult ? (
        <>
          <p className="text-sm text-red-600 mb-6">{t("*Har bir savolda sizga eng yaqin javobni tanlang.")}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div key={qi} ref={(el) => (questionRefs.current[qi] = el)} className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
            {incomplete && (
              <p className="text-red-600 text-sm mb-2">{t("Iltimos, barcha savollarga javob bering.")}</p>
            )}
            <button
              type="submit"
              className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600"
            >
              {t("Natijani ko'rish")}
            </button>
          </form>
        </>
      ) : (
        <ResultCard data={resultData} total={questions.length} t={t} onDone={() => { localStorage.clear(); navigate('/'); }} />
      )}
    </div>
  );
}

function ResultCard({ data, total, t, onDone }) {
  if (!data) return null;
  const { counts, dominant } = data;
  const percent = (n) => Math.round((n / total) * 100);
  const labels = {
    choleric: t("Xolerik"),
    sanguine: t("Sangvinik"),
    phlegmatic: t("Flegmatik"),
    melancholic: t("Melanxolik"),
  };
  const desc = {
    choleric: t("desc_choleric"),
    sanguine: t("desc_sanguine"),
    phlegmatic: t("desc_phlegmatic"),
    melancholic: t("desc_melancholic"),
  };
  return (
    <div className="flex flex-col items-center justify-center w-[92%] max-w-xl m-auto py-10 px-7 rounded-2xl bg-white shadow-xl text-center" style={{ boxShadow: '0 20px 40px rgba(236,0,0,0.18)' }}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t("Temperament testi natijasi")}</h2>
      <p className="text-lg text-gray-700 mb-4">{t("Dominant temperament")}: <span className="font-semibold text-red-600">{labels[dominant]}</span></p>

      <div className="grid grid-cols-1 gap-3 w-full max-w-md mb-6">
        <TypeRow emoji="😠" name={`${labels.choleric}`} value={`${percent(counts.choleric)}%`} />
        <TypeRow emoji="😊" name={`${labels.sanguine}`} value={`${percent(counts.sanguine)}%`} />
        <TypeRow emoji="🫶" name={`${labels.phlegmatic}`} value={`${percent(counts.phlegmatic)}%`} />
        <TypeRow emoji="😔" name={`${labels.melancholic}`} value={`${percent(counts.melancholic)}%`} />
      </div>

      <p className="text-base text-gray-700 mb-6">{desc[dominant]}</p>
      <button onClick={onDone} className="w-auto m-auto mt-2 bg-red-500 text-white py-2.5 px-6 rounded-lg hover:bg-red-600 transition duration-300">{t("Back to Main Page")}</button>
    </div>
  );
}

function TypeRow({ emoji, name, value }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
      <div className="flex items-center gap-2"><span>{emoji}</span><span className="font-medium">{name}</span></div>
      <div className="text-gray-700">{value}</div>
    </div>
  );
}
