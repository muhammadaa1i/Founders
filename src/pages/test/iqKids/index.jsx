import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Simple shape components for visual IQ questions
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

const Triangle = ({ size = 12, color = "#EC0000", className = "" }) => (
  <span
    className={className}
    style={{
      display: "inline-block",
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.6}px solid ${color}`,
    }}
  />
);

export default function IQKids() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = [
    {
      q: t("3, 6, 9, 12, —?"),
      options: [t("A) 13"), t("B) 14"), t("C) 15"), t("D) 18")],
      correct: 2,
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Shakl/Naqsh)")}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <Square color="#000" />
            <Square color="#000" filled />
            <span className="inline-block w-6 h-[2px] bg-black align-middle" />
          </div>
          <div className="text-sm text-gray-600 mt-1">{t("Qaysi belgi ketishi kerak?")}</div>
        </div>
      ),
      options: [
        <span key="a" className="flex items-center gap-2"><span className="mr-1">A)</span><Square color="#000" /></span>,
        <span key="b" className="flex items-center gap-2"><span className="mr-1">B)</span><Square color="#000" filled /></span>,
        <span key="c" className="flex items-center gap-2"><span className="mr-1">C)</span><Triangle color="#EC0000" /></span>,
        <span key="d" className="flex items-center gap-2"><span className="mr-1">D)</span><Circle color="#000" /></span>,
      ],
      correct: 1,
    },
    {
      q: t("Barcha qushlar uchadi. Pingvin uchmaydi. Demak pingvin..."),
      options: [
        t("A) qush emas"),
        t("B) albatta uchadi"),
        t("C) qush, lekin istisno"),
        t("D) hayvon emas"),
      ],
      correct: 2,
    },
    {
      q: t("Qatorni diqqat bilan o'qi va faqat 'A' harflarining sonini sanang: A A B A C D E F A a A a"),
      options: [t("A) 4"), t("B) 5"), t("C) 6"), t("D) 7")],
      correct: 2,
    },
    {
      q: t("12 − 4 × 2 = ?"),
      options: [t("A) 16"), t("B) 8"), t("C) 4"), t("D) 20")],
      correct: 1,
    },
    {
      q: t("Qanot : qush = suzgich : —?"),
      options: [t("A) baliq"), t("B) mushuk"), t("C) quyon"), t("D) daraxt")],
      correct: 0,
    },
    {
      q: t("‘Har bir kvadrat to‘rtburchakdir.’ Shundan nima kelib chiqadi?"),
      options: [
        t("A) Har bir to‘rtburchak kvadrat"),
        t("B) Har qaysi kvadrat to‘rtburchak emas"),
        t("C) Ba’zi to‘rtburchaklar kvadrat"),
        t("D) Kvadratlar uchburchaklar kabidir"),
      ],
      correct: 2,
    },
    {
      q: t("1, 1, 2, 3, 5, 8, — ?"),
      options: [t("A) 10"), t("B) 11"), t("C) 12"), t("D) 13")],
      correct: 3,
    },
    {
      q: t("Soatda hozir 3:40. Chorak soat o'tgach nechchi bo‘ladi?"),
      options: [t("A) 3:55"), t("B) 4:00"), t("C) 4:10"), t("D) 4:20")],
      correct: 0,
    },
    {
      q: (
        <div>
          <div className="font-medium mb-2">{t("(Shakl/Boshqacha)")}</div>
          <div className="flex items-center gap-3">
            <Triangle color="#EC0000" />
            <Triangle color="#1d4ed8" />
            <Square color="#1d4ed8" filled />
            <Triangle color="#EC0000" />
            <Triangle color="#EC0000" />
          </div>
          <div className="text-sm text-gray-600 mt-2">{t("Qaysi biri boshqacha?")}</div>
        </div>
      ),
      options: [t("A) 1-rasm"), t("B) 3-rasm"), t("C) 4-rasm"), t("D) 5-rasm")],
      correct: 1,
    },
    {
      q: t("Qancha to‘g‘ri javob topdingiz? (Natijada ball hisoblanadi)"),
      options: [t("A) 0–3"), t("B) 4–6"), t("C) 7–8"), t("D) 9–10")],
      correct: null,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions (except last self-assessment) are answered
    const firstUnanswered = answers.slice(0, questions.length - 1).findIndex((a) => a === null || a === undefined);
    if (firstUnanswered !== -1) {
      setWarning(t("Iltimos, barcha savollarga javob bering."));
      const el = document.getElementById(`iq-q-${firstUnanswered}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const score = questions.reduce((acc, q, i) => (q.correct !== null && answers[i] === q.correct ? acc + 1 : acc), 0);
    
    let level = "";
    if (score >= 9) {
      level = t("Juda yuqori daraja");
    } else if (score >= 7) {
      level = t("Yuqori");
    } else if (score >= 5) {
      level = t("O'rtacha");
    } else {
      level = t("Qo'shimcha mashq tavsiya");
    }

    setScore(score);
    setLevel(level);

    localStorage.setItem("iqKidsResult", JSON.stringify({ score, total: questions.filter(q=>q.correct!==null).length, level }));

    setShowResult(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white" style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}>
      {!showResult ? (
        <>
          <h1 className="text-2xl font-bold mb-1">{t("IQ testi (Kids)")}</h1>
          <p className="text-sm text-red-600 mb-2">{t("*Har bir savolda sizga eng yaqin javobni tanlang.")}</p>
          {warning && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{warning}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {questions.map((q, qi) => (
              <div id={`iq-q-${qi}`} key={qi} className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
            <button type="submit" className="w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg hover:bg-red-600">
              {t("Natijani ko'rish")}
            </button>
          </form>
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t("IQ testi (Kids) natijasi")}</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-8 py-4 mb-4">
                <p className="text-5xl font-bold">{score}/10</p>
              </div>
              <p className="text-2xl font-semibold text-gray-700 mt-2">{t("Daraja")}: <span className="text-red-600">{level}</span></p>
            </div>
            
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-lg text-gray-700 mb-3">{t("Baholash mezonlari")}:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>9-10:</strong> {t("Juda yuqori daraja")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>7-8:</strong> {t("Yuqori")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✓</span>
                  <span><strong>5-6:</strong> {t("O'rtacha")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">!</span>
                  <span><strong>≤4:</strong> {t("Qo'shimcha mashq tavsiya")}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  const testFlow = JSON.parse(localStorage.getItem("testFlow") || '{"completed": []}');
                  testFlow.completed.push("iq");
                  localStorage.setItem("testFlow", JSON.stringify(testFlow));
                  navigate("/perception");
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t("Keyingi testga o'tish")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
