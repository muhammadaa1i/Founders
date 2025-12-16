import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CHOLERIC = "choleric";
const SANGUINE = "sanguine";
const PHLEGMATIC = "phlegmatic";
const MELANCHOLIC = "melancholic";

export default function TemperamentGeneral() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = [
    {
      q: t("Men tez qaror qabul qilaman, kutishni yoqtirmayman."),
      options: [
        t("A) Men tez qaror qabul qilaman, kutishni yoqtirmayman."),
        t("B) Men oson moslashaman va yangi narsalarni tez o'rganaman."),
        t("C) Men harakatsiz, mulohaza bilan ish tutaman."),
        t("D) Men qaror qabul qilishdan oldin uzoq ikkilanganman."),
      ],
    },
    {
      q: t("Men tez 'portlashim' mumkin, lekin tezda tinchlanaman."),
      options: [
        t("A) Men tez 'portlashim' mumkin, lekin tezda tinchlanaman."),
        t("B) Men odatda ijobiy kayfiyatda yuraman."),
        t("C) Men tinch, bosiqman, hissiyotlarimni boshqaraman."),
        t("D) Men ichimda ko'p narsa saqlayman, lekin bu meni ezadi."),
      ],
    },
    {
      q: t("Men yetakchilikni yoqtiraman, boshqalarni boshqarish menga yoqadi."),
      options: [
        t("A) Men yetakchilikni yoqtiraman, boshqalarni boshqarish menga yoqadi."),
        t("B) Men jamoada yaxshi ishlayman, odamlar bilan tez chiqishaman."),
        t("C) Men ko'proq mustaqil ishlashni afzal ko'raman."),
        t("D) Men ko'p hollarda kuzatuvchi bo'lib qolaman."),
      ],
    },
    {
      q: t("Men bosim ostida ham tez harakat qilaman."),
      options: [
        t("A) Men bosim ostida ham tez harakat qilaman."),
        t("B) Men stressda ham ijobiylikni saqlayman."),
        t("C) Men bosiqlik bilan yechim izlayman."),
        t("D) Men stressda o'zimni yomon his qilaman."),
      ],
    },
    {
      q: t("Men doimo yangilik izlayman, bir joyda tura olmayman."),
      options: [
        t("A) Men doimo yangilik izlayman, bir joyda tura olmayman."),
        t("B) Menga odamlar, suhbatlar, harakat yoqadi."),
        t("C) Men barqarorlikni va tinch muhitni yoqtiraman."),
        t("D) Men yolg'izlikda o'zimni yaxshi his qilaman."),
      ],
    },
    {
      q: t("Agar biror narsa noto'g'ri bo'lsa, men to'g'ridan-to'g'ri aytaman."),
      options: [
        t("A) Agar biror narsa noto'g'ri bo'lsa, men to'g'ridan-to'g'ri aytaman."),
        t("B) Men yumshoqlik bilan tushuntirishga harakat qilaman."),
        t("C) Men jim qolib, vaziyatni tahlil qilaman."),
        t("D) Men odatda o'zimni aybdor his qilaman, hatto aybim bo'lmasa ham."),
      ],
    },
    {
      q: t("Meni motivatsiya faqat natija beradi."),
      options: [
        t("A) Meni motivatsiya faqat natija beradi."),
        t("B) Meni motivatsiya — jarayonning o'zi va ijobiy muhit."),
        t("C) Men reja va tartib asosida harakat qilaman."),
        t("D) Men his-tuyg'ularim kuchliroq boshqaradi."),
      ],
    },
    {
      q: t("Men tanqidni og'ir qabul qilaman, lekin bu meni harakatga undaydi."),
      options: [
        t("A) Men tanqidni og'ir qabul qilaman, lekin bu meni harakatga undaydi."),
        t("B) Men tanqidni oson qabul qilaman, ko'p narsa o'rganaman."),
        t("C) Men tahlil qilaman, lekin hissiyotga berilmayman."),
        t("D) Men tanqiddan keyin uzoq vaqt o'ylab yuraman."),
      ],
    },
    {
      q: t("Men risk qilishdan qo'rqmayman."),
      options: [
        t("A) Men risk qilishdan qo'rqmayman."),
        t("B) Men o'ylangan, lekin yangi narsalarni sinashni yoqtiraman."),
        t("C) Men xavfsiz variantni tanlayman."),
        t("D) Men yangilikdan xavotirlanaman."),
      ],
    },
    {
      q: t("Men tez, emosional va faol odamman."),
      options: [
        t("A) Men tez, emosional va faol odamman."),
        t("B) Men quvnoq, ochiq, ijobiy insonman."),
        t("C) Men tinch, muvozanatli va sabrli odamman."),
        t("D) Men sezgir, ichki dunyom boy, lekin oson ranjiydigan odamman."),
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

  const mapIndexToType = (oi) => (oi === 0 ? CHOLERIC : oi === 1 ? SANGUINE : oi === 2 ? PHLEGMATIC : MELANCHOLIC);

  const handleSelect = (qi, oi) => {
    const next = [...answers];
    next[qi] = oi;
    setAnswers(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((a)=>a===null)) {
      setIncomplete(true);
      const firstIdx = answers.findIndex((a)=>a===null);
      const el = questionRefs.current[firstIdx];
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; }
    setIncomplete(false);

    const counts = answers.reduce(
      (acc, ans) => { const k = mapIndexToType(ans); if (k) acc[k] += 1; return acc; },
      { [CHOLERIC]: 0, [SANGUINE]: 0, [PHLEGMATIC]: 0, [MELANCHOLIC]: 0 }
    );

    const dominant = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
    localStorage.setItem("temperamentGeneralResult", JSON.stringify({ counts, dominant }));
    setResultData({ counts, dominant });
    setShowResult(true);

    const registrationData = JSON.parse(localStorage.getItem("registrationData"));
    const token = "7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw";
    const chat_id = -1002585473961;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const labels = { choleric: t("Xolerik"), sanguine: t("Sangvinik"), phlegmatic: t("Flegmatik"), melancholic: t("Melanxolik") };

    if (registrationData) {
      const messageContent = `\n📝 Ro‘yxatdan o‘tish:\n👤 Ismi: ${registrationData.name}\n🎂 Tug'ilgan sana: ${registrationData.birthdate}\n📞 Telefon: ${registrationData.phone}\n📢 Qayerdan eshitdi: ${registrationData.heard}\n❓ Muammo: ${registrationData.problem}\n📍 Viloyat: ${registrationData.region}\n🏙 Tuman: ${registrationData.district}\n\n📊 ${t("Temperament testi natijasi")} (General):\n🔥 ${labels.choleric}: ${counts[CHOLERIC]}\n😊 ${labels.sanguine}: ${counts[SANGUINE]}\n🌿 ${labels.phlegmatic}: ${counts[PHLEGMATIC]}\n🌧️ ${labels.melancholic}: ${counts[MELANCHOLIC]}\n⭐ Temperament: ${labels[dominant]}\n`;
      try { await axios.post(url, { chat_id, text: messageContent }); localStorage.removeItem("registrationData"); } catch {}
    }

    // Do not navigate immediately; show result panel first
  };

  const containerClass = showResult
    ? "max-w-3xl mx-auto mt-10 mb-12 px-4 pt-6 pb-6"
    : "max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white";

  return (
    <div className={containerClass} style={!showResult ? { boxShadow: '15px 15px 40px 0px #FF00004D' } : undefined}>
      <h1 className="text-2xl font-bold mb-1">{t("Temperament testi (General)")}</h1>
      {!showResult ? (
        <>
          <p className="text-sm text-red-600 mb-6">{t("*Har bir savolda sizga eng yaqin javobni tanlang.")}</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div key={qi} ref={(el)=> (questionRefs.current[qi] = el)} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">{qi + 1}. {q.q}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2">
                      <input type="radio" name={`q-${qi}`} checked={answers[qi] === oi} onChange={() => handleSelect(qi, oi)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {incomplete && (
              <p className="text-red-600 text-sm mb-2">{t("Iltimos, barcha savollarga javob bering.")}</p>
            )}
            <button type="submit" className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600">
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
  const labels = { choleric: t("Xolerik"), sanguine: t("Sangvinik"), phlegmatic: t("Flegmatik"), melancholic: t("Melanxolik") };
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
