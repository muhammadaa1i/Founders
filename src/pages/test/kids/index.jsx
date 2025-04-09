import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../../../public/servers/kids.json";
import kids1 from '../../../assets/kids1.png'
import kids2 from '../../../assets/kids2.png'
import kids3 from '../../../assets/kids3.png'
import kids4 from '../../../assets/kids4.png'
import kids5 from '../../../assets/kids5.png'
import kids6 from '../../../assets/kids6.png'
import { useTranslation } from "react-i18next";

export default function KidsEnglishTask() {
  const { t, i18n } = useTranslation();
  const ChangeLng = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("i18nextLng", selectedLanguage);
  };
  const [step, setStep] = useState(() => {
    const isTestCompleted = localStorage.getItem('testCompleted') === 'true';
    if (isTestCompleted) {
      return 6;
    }
    return parseInt(localStorage.getItem('currentStep')) || 1;
  });

  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const kidsimages = [kids1, kids2, kids3, kids4, kids5, kids6]

  const initializeAnswers = () => {
    if (!data) return [];

    const savedAnswers = JSON.parse(localStorage.getItem(`step${step}Answers`)) || [];
    if (step === 1) return savedAnswers.length ? savedAnswers : Array(data.images.length).fill("");
    if (step === 2) return savedAnswers.length ? savedAnswers : Array(data.words.length).fill("");
    if (step === 3) return savedAnswers.length ? savedAnswers : Array(data.questions.length).fill("");
    if (step === 4) return savedAnswers.length ? savedAnswers : Array(data.sentences.length).fill("");
    if (step === 5) return savedAnswers.length ? savedAnswers : Array(data.shortAnswers.length).fill("");
    if (step === 6) return savedAnswers.length ? savedAnswers : Array(data.putWordsQuestions.length).fill("");
    return [];
  };

  useEffect(() => {
    const isTestCompleted = localStorage.getItem('testCompleted') === 'true';
    if (isTestCompleted) {
      setShowFinalScore(true);
      setStep(6);
      const savedScore = parseInt(localStorage.getItem('score')) || 0;
      setTotalCorrect(savedScore);
    } else {
      setAnswers(initializeAnswers());
      localStorage.setItem('currentStep', step);
      localStorage.setItem('score', score);
      localStorage.setItem('totalCorrect', totalCorrect);
    }
  }, [step, score, totalCorrect]);


  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value || "";
    setAnswers(newAnswers);
    localStorage.setItem(`step${step}Answers`, JSON.stringify(newAnswers));
  };

  const getCorrectAnswerByStep = (step, index) => {
    const stepDataMap = {
      1: data.images[index]?.answer,
      2: data.words[index]?.translation,
      3: data.correctAnswers[index],
      4: data.sentencesAnswers[index],
      5: data.shortAnswers[index]?.correct,
      6: data.putWordsAnswers[index],
    };

    return stepDataMap[step];
  };

  const checkAnswers = () => {
    if (answers.every((answer) => (answer?.trim?.() || "") === "")) {
      setError(true);
      return false;
    }

    let correctCount = 0;
    const wrongAnswers = []; // noto‘g‘ri javoblar shu yerda to‘planadi

    answers.forEach((answer, index) => {
      const trimmedAnswer = (answer?.trim?.().toLowerCase()) || "";
      let isCorrect = false;

      if (
        step === 1 &&
        data.images[index]?.answer &&
        (Array.isArray(data.images[index].answer)
          ? data.images[index].answer.some((ans) => ans.toLowerCase() === trimmedAnswer)
          : data.images[index].answer.toLowerCase() === trimmedAnswer)
      ) {
        isCorrect = true;
      } else if (
        step === 2 &&
        data.words[index]?.translation &&
        (Array.isArray(data.words[index].translation)
          ? data.words[index].translation.some((ans) => ans.toLowerCase() === trimmedAnswer)
          : data.words[index].translation.toLowerCase() === trimmedAnswer)
      ) {
        isCorrect = true;
      } else if (step === 3) {
        const correctAnswer = data.correctAnswers[index];
        if (Array.isArray(correctAnswer)) {
          if (correctAnswer.some((ans) => ans.toLowerCase() === trimmedAnswer)) {
            isCorrect = true;
          }
        } else {
          if (correctAnswer?.toLowerCase() === trimmedAnswer) {
            isCorrect = true;
          }
        }
      } else if (step === 4) {
        const correctAnswer = data.sentencesAnswers[index];
        if (Array.isArray(correctAnswer)) {
          if (correctAnswer.some((ans) => ans.toLowerCase() === trimmedAnswer)) {
            isCorrect = true;
          }
        } else {
          if (correctAnswer?.toLowerCase() === trimmedAnswer) {
            isCorrect = true;
          }
        }
      } else if (
        step === 5 &&
        data.shortAnswers[index]?.correct &&
        (Array.isArray(data.shortAnswers[index].correct)
          ? data.shortAnswers[index].correct.some((ans) => ans.toLowerCase() === trimmedAnswer)
          : data.shortAnswers[index].correct.toLowerCase() === trimmedAnswer)
      ) {
        isCorrect = true;
      } else if (
        step === 6) {
        const correctAnswer = data.putWordsAnswers[index];
        if (Array.isArray(correctAnswer)) {
          if (correctAnswer.some((ans) => ans.toLowerCase() === trimmedAnswer)) {
            isCorrect = true;
          }
        } else {
          if (correctAnswer?.toLowerCase() === trimmedAnswer) {
            isCorrect = true;
          }
        }
      }

      if (isCorrect) {
        correctCount++;
      } else {
        // noto‘g‘ri javoblarni saqlaymiz
        wrongAnswers.push({
          questionIndex: index,
          userAnswer: trimmedAnswer,
          correctAnswer: getCorrectAnswerByStep(step, index),
        });
      }
    });

    setScore((prevScore) => prevScore + correctCount);

    const existingWrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers")) || [];
    const updatedWrongAnswers = [...existingWrongAnswers, ...wrongAnswers];
    localStorage.setItem("wrongAnswers", JSON.stringify(updatedWrongAnswers));

    return true;
  };


  const goToNextStep = () => {
    if (checkAnswers()) {
      if (step < 6) {
        setStep(prevStep => prevStep + 1);
        setError(false);
      } else {
        setTotalCorrect(score);
        setShowFinalScore(true);
      }
    }
  };

  const finishTest = () => {
    if (checkAnswers()) {
      setTotalCorrect(score);
      setShowFinalScore(true);
      localStorage.setItem('testCompleted', 'true');
    }
  };

  const stepTitles = {
    1: "Identify the images",
    2: "Translate the words:",
    3: "Read text, answer the questions",
    4: "Rearrange the sentences",
    5: "Give short answers",
    6: "Put the words",
  };

  const getLevel = (score) => {
    if (score >= 43) return "Level 06";
    if (score >= 36) return "Level 05";
    if (score >= 26) return "Level 04";
    if (score >= 19) return "Level 03";
    if (score >= 10) return "Level 02";
    return "Level 01";
  };

  const totalQuestions = data ? (data.images.length + data.words.length + data.questions.length +
    data.sentences.length + data.shortAnswers.length + data.putWordsQuestions.length) : 0;

  if (!data) return <div>Loading...</div>; // Loading state
 
  return (
    <div className="p-6 max-w-lg mt-20 mx-auto bg-white shadow-lg rounded-lg">
      {showFinalScore ? (
        <div className="text-center flex flex-col p-6">
          <p className="text-2xl font-medium mb-4 text-gray-700">
            {t("Your score")}:
          </p>
          <span className="font-medium text-2xl">
            {totalCorrect}/{totalQuestions}
          </span>
          <p className="text-lg font-semibold text-gray-700">
            {t("Your level")}: {" "}
            <span className="font-semibold text-2xl text-red-600">
              {getLevel(totalCorrect)}
            </span>
          </p>
          <p className=" font-monserat text-xl font-semibold text-gray-700 mb-6 px-8">{t("Kelajangizni o'zgartiruvchi testni muvaffaqiyatli ishlaganingizdan juda xurzandmiz! Sizni hayotingizni tubdan o'zgartiruvchi qo'ng'irog'imizni kuting!")}</p>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="max-w-[200px] w-full m-auto mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            {t("Back to Main Page")}
          </button>
        </div>
      ) : (
        <>
          <p className="text-xl font-bold text-center text-gray-800">
            {stepTitles[step]}
          </p>
          <h2 className="text-[#EC0000] font-semibold text-center text-xl mb-6">
            Part {step}
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">
              Please fill in all answers before proceeding!
            </p>
          )}

          {/* Step 1: Render images */}
          {step === 1 && (
            <div className="space-y-4">
              {kidsimages.map((images, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 1}. What is this?
                  </p>
                  <img
                    src={images}
                    loading='lazy'
                    alt={`Question ${index + 1}`}
                    className="w-24 h-24 mb-3 object-contain"
                  />
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[80%] min-[400px]:w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Render words */}
          {step === 2 && (
            <div className="space-y-4">
              {data.words.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 7}. {item.word}
                  </p>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Render questions */}
          {step === 3 && (
            <div>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold mb-2 text-gray-700">
                  Read the text:
                </p>
                <p className="whitespace-pre-line text-gray-600">{data.text}</p>
              </div>
              <div className="space-y-4">
                {data.questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-gray-700 mb-2">
                      {index + 13}. {question}
                    </p>
                    <input
                      type="text"
                      value={answers[index] || ""}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-[80%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Step 4: Render sentences */}
          {step === 4 && (
            <div className="space-y-4">
              {data.sentences.map((sentence, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 17}. {sentence}
                  </p>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Render short answers */}
          {step === 5 && (
            <div className="space-y-4">
              {data.shortAnswers.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 28}. {item.question}
                  </p>
                  <input
                    type="text"
                    value={answers[index] || (index === 0 ? "No, " : "Yes, ")}
                    onChange={(e) =>
                      handleAnswerChange(index, e.target.value)
                    }
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 6: Render put words questions */}
          {step === 6 && (
            <div className="space-y-4">
              <p className="border-2 border-gray-300 p-4 rounded-lg text-[16px] font-semibold text-center">
                Whisper | Suspicious | Slowly | Never | Amazing | Apron
              </p>
              {data.putWordsQuestions.map((question, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 34}. {question}
                  </p>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="min-w-[20%] w-fit m-auto border-2 border-gray-700 rounded-[10px] outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between gap-4">
            {step < 6 ? (
              <button
                onClick={goToNextStep}
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={finishTest}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition duration-300"
              >
                Finish
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}