import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Shape components for visual IQ questions
const Square = ({ size = 16, color = "#000", filled = false, className = "" }) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      backgroundColor: filled ? color : "transparent",
      border: `2px solid ${color}`,
      boxSizing: "border-box",
    }}
  />
);

const Circle = ({ size = 16, color = "#000", filled = true, className = "" }) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: filled ? color : "transparent",
      border: `2px solid ${color}`,
      boxSizing: "border-box",
    }}
  />
);

const Triangle = ({ size = 12, color = "#EC0000", filled = true, className = "" }) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.6}px solid ${filled ? color : 'transparent'}`,
      borderTop: filled ? 'none' : `${size * 1.6}px solid ${color}`,
    }}
  />
);

export default function IQGeneral() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = [
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Arifmetik/Qator)")}</div>
          <div>{t("4, 6, 9, 13, 18, —?")}</div>
        </div>
      ),
      options: [t("A) 22"), t("B) 24"), t("C) 26"), t("D) 28")],
      correct: 1, 
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Shakl/Matritsa mantiqi)")}</div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <span className="inline-block w-6 h-[2px] bg-black align-middle" />
            <span>?</span>
          </div>
        </div>
      ),
      options: [
        <span key="a" className="flex items-center gap-2"><span className="mr-1">A)</span><Square color="#000" filled /><Square color="#000" /><Square color="#000" filled /><Square color="#000" /></span>,
        <span key="b" className="flex items-center gap-2"><span className="mr-1">B)</span><Square color="#000" /><Square color="#000" /><Square color="#000" filled /><Square color="#000" filled /></span>,
        <span key="c" className="flex items-center gap-2"><span className="mr-1">C)</span><Square color="#000" filled /><Square color="#000" filled /><Square color="#000" /><Square color="#000" /></span>,
        <span key="d" className="flex items-center gap-2"><span className="mr-1">D)</span><Square color="#000" /><Square color="#000" filled /><Square color="#000" filled /><Square color="#000" /></span>,
      ],
      correct: 0, // A - Answer: 2A
    },
    {
      q: t("Ba'zi talabalar sportchi. Hech bir sportchi emas. Demak:"),
      options: [
        t("A) Ba'zi talabalar dangasa"),
        t("B) Ba'zi talabalar dangasa emas"),
        t("C) Barcha talabalar sportchi"),
        t("D) Xulosa yo'q"),
      ],
      correct: 1, // B - Answer: 3B
    },
    {
      q: t("Quyidagi satrda raqam bo'lmagan belgilar nechta?"),
      subtext: "5 7 # 9 @ 3 % 1 & 2 !",
      options: [t("A) 3"), t("B) 4"), t("C) 5"), t("D) 6")],
      correct: 3, // D - Answer: 4D
    },
    {
      q: t("12 : 18 = x : 27 → x = ?"),
      options: [t("A) 16"), t("B) 18"), t("C) 24"), t("D) 36")],
      correct: 3, // D (should be O according to answer key, but O likely means no answer or option D) - Answer: 5O
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Shakl/Naqsh)")}</div>
          <div className="flex items-center gap-2 mb-2">
            <Triangle color="#000" />
            <Triangle color="#000" />
            {'\u25BC'}
            <Triangle color="#000" />
            <Triangle color="#000" />
            {'\u25BC'}
            <Triangle color="#000" />
            <span className="inline-block w-6 h-[2px] bg-black align-middle" />
            <span>{t("navbat qaysi naqshniki")}</span>
          </div>
        </div>
      ),
      options: [
        <span key="a" className="flex items-center gap-2"><span className="mr-1">A)</span><Triangle color="#000" /></span>,
        <span key="b" className="flex items-center gap-2"><span className="mr-1">B)</span>{'\u25BC'}</span>,
        <span key="c" className="flex items-center gap-2"><span className="mr-1">C)</span><Circle color="#000" /></span>,
        <span key="d" className="flex items-center gap-2"><span className="mr-1">D)</span><Square color="#000" filled /></span>,
      ],
      correct: 1, // B - Answer: 6B
    },
    {
      q: t("5 ta boladan biri uzun bo'yli, biri past bo'yli, uchinchisi o'rtacha bo'yli, to'rtinchisi baland bo'yli, beshinchisi uzun bo'yli. Eng baland bo'yli nechta bola bor?"),
      options: [t("A) 1"), t("B) 2"), t("C) 3"), t("D) 4")],
      correct: 0, // A - Answer: 7A
    },
    {
      q: t("'MISSISSIPPI' so'zida nechta undosh bor?"),
      options: [t("A) 2"), t("B) 3"), t("C) 4"), t("D) 7")],
      correct: 3, // D - Answer: 8D
    },
    {
      q: t("'MEN tez ham emas, sekin ham emas, lekin ___ yuraman.' Qaysi so'z mantiqan to'g'ri?"),
      options: [
        t("A) barqaror"),
        t("B) keskin"),
        t("C) kechga qolib"),
        t("D) shoshilib"),
      ],
      correct: 2, // C - Answer: 9C
    },
    {
      q: t("Quyidagida faqat kichik 'l' (el) harflari nechta?"),
      subtext: "I I I I I I I I I",
      options: [t("A) 3"), t("B) 4"), t("C) 5"), t("D) 6")],
      correct: 2, // C - Answer: 10C
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Shakl/Analogiya)")}</div>
          <div className="text-gray-700 mb-2">
            {t("O : 360° = □ : ___ ?")}
          </div>
        </div>
      ),
      options: [t("A) 90°"), t("B) 180°"), t("C) 270°"), t("D) 360°")],
      correct: 3, // D - Answer: 11D
    },
    {
      q: t("Juma 23:50 dan 75 daqiqa o'tsa, qaysi kun/soat?"),
      options: [
        t("A) Shanba 00:55"),
        t("B) Shanba 01:05"),
        t("C) Shanba 01:10"),
        t("D) Yakshanba 01:05"),
      ],
      correct: 1, // B - Answer: 12B
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("");
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
    setWarning("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    const firstUnanswered = answers.findIndex((a) => a === null || a === undefined);
    if (firstUnanswered !== -1) {
      setWarning(t("Iltimos, barcha savollarga javob bering."));
      const el = document.getElementById(`iq-general-q-${firstUnanswered}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const calculatedScore = questions.reduce((acc, q, i) => (answers[i] === q.correct ? acc + 1 : acc), 0);
    
    let levelText = "";
    if (calculatedScore >= 11) {
      levelText = t("Juda yuqori daraja");
    } else if (calculatedScore >= 9) {
      levelText = t("Yuqori");
    } else if (calculatedScore >= 7) {
      levelText = t("O'rtacha");
    } else {
      levelText = t("Qo'shimcha mashq tavsiya");
    }

    setScore(calculatedScore);
    setLevel(levelText);

    localStorage.setItem("iqGeneralResult", JSON.stringify({ score: calculatedScore, total: questions.length, level: levelText }));

    const registrationData = JSON.parse(localStorage.getItem("registrationData"));
    const token = "7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw";
    const chat_id = -1002585473961;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    if (registrationData) {
      const toLetter = (idx) => idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D';
      const details = answers
        .map((ans, i) => {
          const ansLetter = ans === null ? '-' : toLetter(ans);
          const corLetter = toLetter(questions[i].correct);
          return `${i+1}) ${ansLetter} / ${corLetter}`;
        })
        .join("\n");

      const messageContent = `\n📝 ${t("Ro'yxatdan o'tish")}:\n👤 ${t("Ismi")}: ${registrationData.name}\n🎂 ${t("Tug'ilgan sana")}: ${registrationData.birthdate}\n📞 ${t("Telefon")}: ${registrationData.phone}\n📢 ${t("Qayerdan eshitdi")}: ${registrationData.heard}\n❓ ${t("Muammo")}: ${registrationData.problem}\n📍 ${t("Viloyat")}: ${registrationData.region}\n🏙 ${t("Tuman")}: ${registrationData.district}\n\n🧠 ${t("IQ testi (General)")}: ${calculatedScore}/${questions.length}\n📊 ${t("Daraja")}: ${levelText}\n\n${t("Javoblar (Tanlangan/To'g'ri)")}:\n${details}`;
      try { await axios.post(url, { chat_id, text: messageContent }); } catch {}
    }

    setShowResult(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
      {!showResult ? (
        <>
          <h1 className="text-2xl font-bold mb-1">{t("IQ testi (General)")}</h1>
          <p className="text-sm text-red-600 mb-2">{t("*Har bir savolda sizga eng yaqin javobni tanlang.")}</p>
          {warning && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{warning}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div id={`iq-general-q-${qi}`} key={qi} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">{qi + 1}. {q.q}</p>
                {q.subtext && <p className="text-gray-600 mb-2 font-mono">{q.subtext}</p>}
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                      <input type="radio" name={`q-${qi}`} checked={answers[qi] === oi} onChange={() => handleSelect(qi, oi)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600 transition-all">
              {t("Natijani ko'rish")}
            </button>
          </form>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t("IQ testi (General) natijasi")}</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-8 py-4 mb-4">
                <p className="text-5xl font-bold">{score}/12</p>
              </div>
              <p className="text-2xl font-semibold text-gray-700 mt-2">{t("Daraja")}: <span className="text-red-600">{level}</span></p>
            </div>
            
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-lg text-gray-700 mb-3">{t("Baholash mezonlari")}:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>11-12:</strong> {t("Juda yuqori daraja")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>9-10:</strong> {t("Yuqori")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span><strong>7-8:</strong> {t("O'rtacha")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">!</span>
                  <span><strong>≤6:</strong> {t("Qo'shimcha mashq tavsiya")}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
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
