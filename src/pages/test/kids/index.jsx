import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import data from "../../../../public/servers/kids.json";
import kids1 from "../../../assets/kids1.png";
import kids2 from "../../../assets/kids2.png";
import kids3 from "../../../assets/kids3.png";
import kids4 from "../../../assets/kids4.png";
import kids5 from "../../../assets/kids5.png";
import kids6 from "../../../assets/kids6.png";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableWord({ word, listeners, attributes, setNodeRef, style }) {
  return (
    <span
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 12px",
        margin: "0 6px 6px 0",
        background: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        cursor: "grab",
        fontWeight: 500,
        fontSize: 16,
        minWidth: 40,
        maxWidth: 160,
        userSelect: "none",
        transition: "background 0.2s, box-shadow 0.2s",
        touchAction: "none",
        ...style,
      }}
    >
      {word}
    </span>
  );
}

function PoolDraggable({ word, inBlank = false, overlay = false }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: word,
  });

  const style = overlay
    ? {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 16,
        minWidth: 40,
        maxWidth: 160,
        background: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        boxSizing: "border-box",
        outline: "none",
        zIndex: 9999,
        pointerEvents: "none",
        padding: "8px 12px",
        margin: 0,
      }
    : inBlank
    ? {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: 16,
        minWidth: 40,
        maxWidth: "100%",
        width: "auto",
        background: "transparent",
        border: "none",
        margin: 0,
        padding: 0,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        boxSizing: "border-box",
        outline: "none",
        verticalAlign: "middle",
      }
    : {
        transform: CSS.Transform.toString(transform),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 12px",
        margin: "0 6px 6px 0",
        background: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        cursor: "grab",
        fontWeight: 500,
        fontSize: 16,
        minWidth: 40,
        maxWidth: 160,
        userSelect: "none",
        transition: "background 0.2s, box-shadow 0.2s",
        touchAction: "none",
      };

  return (
    <span ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {word}
    </span>
  );
}

function PoolDroppable({ children, id = 'answers-pool' }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="flex flex-wrap gap-3 justify-center mb-6 min-h-[56px]"
      style={{
        background: isOver ? '#f3f4f6' : undefined,
        border: isOver ? '2px solid #EC0000' : undefined,
        borderRadius: 8,
        padding: 8,
        minHeight: 56,
        transition: 'border 0.2s, background 0.2s',
      }}
    >
      {children}
    </div>
  );
}

function BlankDroppable({ idx, answer, activeDragWord }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `blank-${idx}`,
  });

  return (
    <span
      ref={setNodeRef}
      className={`inline-flex items-center justify-center px-3 py-1 border-2 border-dashed rounded-md min-w-[80px] h-10 ${
        isOver ? "border-green-500 bg-green-100" : "border-gray-400 bg-gray-200"
      } ${answer && answer !== activeDragWord ? "border-solid bg-gray-50" : ""}`}
    >
      {answer && answer !== activeDragWord ? <PoolDraggable word={answer} inBlank={true} /> : " "}
    </span>
  );
}

function getWordId(sentenceIdx, wordIdx) {
  return `sentence${sentenceIdx}-word${wordIdx}`;
}

function normalizeAnswer(str) {
  if (!str) return "";
  if (Array.isArray(str)) str = str.join(" ");
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[.,!?;:()[\]{}'"-]+|[.,!?;:()[\]{}'"-]+$/g, "");
}

export default function KidsEnglishTask() {
  const { t } = useTranslation();
  const [step, setStep] = useState(() => {
    const isTestCompleted = localStorage.getItem("testCompleted") === "true";
    if (isTestCompleted) {
      return 6;
    }
    return parseInt(localStorage.getItem("currentStep")) || 1;
  });

  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const [registrationData, setRegistrationData] = useState(null);

  const part6Words = [
    "Whisper",
    "Suspicious",
    "Slowly",
    "Never",
    "Amazing",
    "Apron",
  ];
  const [part6Available, setPart6Available] = useState(part6Words);
  const [part6Answers, setPart6Answers] = useState(Array(6).fill(null));
  const [activeDragWord, setActiveDragWord] = useState(null);

  const [sentenceOrders, setSentenceOrders] = useState(() => {
    if (step === 4 && data && data.sentences) {
      const saved = JSON.parse(localStorage.getItem('step4Answers'));
      if (saved && Array.isArray(saved) && saved.length === data.sentences.length) {
        return saved;
      }
      return data.sentences.map((s, sIdx) => {
        const words = s.split('/');
        return words.map((_, wIdx) => getWordId(sIdx, wIdx));
      });
    }
    return [];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem("registrationData");
    if (saved) {
      setRegistrationData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (step === 4 && data && data.sentences) {
      const saved = JSON.parse(localStorage.getItem('step4Answers'));
      if (saved && Array.isArray(saved) && saved.length === data.sentences.length) {
        setSentenceOrders(saved);
      } else {
        setSentenceOrders(
          data.sentences.map((s, sIdx) => {
            const words = s.split('/');
            return words.map((_, wIdx) => getWordId(sIdx, wIdx));
          })
        );
      }
    }
  }, [step]);

  const initializeAnswers = () => {
    if (!data) return [];

    const savedAnswers =
      JSON.parse(localStorage.getItem(`step${step}Answers`)) || [];
    if (step === 1)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.images.length).fill("");
    if (step === 2)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.words.length).fill("");
    if (step === 3)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.questions.length).fill("");
    if (step === 4)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.sentences.length).fill("");
    if (step === 5)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.shortAnswers.length).fill("");
    if (step === 6)
      return savedAnswers.length
        ? savedAnswers
        : Array(data.putWordsQuestions.length).fill("");
    return [];
  };

  useEffect(() => {
    const isTestCompleted = localStorage.getItem("testCompleted") === "true";
    if (isTestCompleted) {
      setShowFinalScore(true);
      setStep(6);
      const savedScore = parseInt(localStorage.getItem("score")) || 0;
      setTotalCorrect(savedScore);
    } else {
      setAnswers(initializeAnswers());
      localStorage.setItem("currentStep", step);
      localStorage.setItem("score", score);
      localStorage.setItem("totalCorrect", totalCorrect);
    }
  }, [step, score, totalCorrect]);

  useEffect(() => {
    if (showFinalScore) {
      const startTimer = setTimeout(() => {
        setShowConfetti(true);
        const stopTimer = setTimeout(() => setShowConfetti(false), 20000);
        return () => clearTimeout(stopTimer);
      }, 100);
      return () => clearTimeout(startTimer);
    }
  }, [showFinalScore]);

  useEffect(() => {
    if (step === 4 && sentenceOrders.length) {
      const joined = sentenceOrders.map((idArr, sIdx) => {
        const words = data.sentences[sIdx].split("/");
        return idArr
          .map((id) => {
            const match = id.match(/sentence\d+-word(\d+)/);
            return match ? words[parseInt(match[1])] : "";
          })
          .join(" ");
      });
      setAnswers(joined);
      localStorage.setItem("step4Answers", JSON.stringify(sentenceOrders));
    }
  }, [sentenceOrders, step]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value || "";
    setAnswers(newAnswers);
    localStorage.setItem(`step${step}Answers`, JSON.stringify(newAnswers));
  };

  const handleDragEndStep4 = (event, sIdx) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSentenceOrders((prev) => {
      const newOrders = [...prev];
      const oldIndex = newOrders[sIdx].indexOf(active.id);
      const newIndex = newOrders[sIdx].indexOf(over.id);
      newOrders[sIdx] = arrayMove(newOrders[sIdx], oldIndex, newIndex);
      return newOrders;
    });
  };

  // Utility to detect touch device
  const isTouchDevice = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    []
  );

  // Sensors: call hooks unconditionally, choose based on device type
  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 8,
    },
  });
  const sensors = useSensors(
    pointerSensor,
    ...(isTouchDevice ? [touchSensor] : [])
  );

  // Update handlePart6DragEnd for robust mobile/tablet support
  const handlePart6DragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const word = active.id;
    const overId = over.id;

    if (overId === "pool") {
      // Return word to pool from any blank
      setPart6Answers((prev) => {
        const newAnswers = [...prev];
        const idx = newAnswers.indexOf(word);
        if (idx !== -1) {
          newAnswers[idx] = null;
        }
        return newAnswers;
      });
      setPart6Available((prev) => {
        if (!prev.includes(word)) {
          return [...prev, word];
        }
        return prev;
      });
    } else if (overId.startsWith("blank-")) {
      const blankIdx = parseInt(overId.replace("blank-", ""));
      setPart6Answers((prev) => {
        const newAnswers = [...prev];
        const existingIdx = newAnswers.indexOf(word);
        // Remove the dragged word from any previous blank
        if (existingIdx !== -1) {
          newAnswers[existingIdx] = null;
        }
        // If the target blank has a word, swap it back to the pool
        const replacedWord = newAnswers[blankIdx];
        if (replacedWord && replacedWord !== word) {
          setPart6Available((prev) => {
            if (!prev.includes(replacedWord)) {
              return [...prev, replacedWord];
            }
            return prev;
          });
        }
        // Place the dragged word in the target blank
        newAnswers[blankIdx] = word;
        return newAnswers;
      });
      // Remove the dragged word from the pool
      setPart6Available((prev) => prev.filter((w) => w !== word));
    }

    localStorage.setItem("step6Answers", JSON.stringify(part6Answers));
  };

  const getCorrectAnswerByStep = (step, index) => {
    const part1Answers = [
      "Car",
      "Swim",
      "Suitcase",
      "Newspaper",
      "Anchor",
      "Elbow",
    ];
    const part2Answers = [
      "Сидеть / o'tirmoq",
      "Чашка / chashka",
      "Уронить / tushirib yubormoq",
      "Мясо / go'sht",
      "Зрители / tomoshabinlar",
      "Пар / bug', par",
    ];
    const part3Answers = [
      "Her name is Molly.",
      "She is fourteen.",
      "She is playing.",
      "He is a pilot.",
      "She is going to learn Japanese.",
      "She is a model.",
      "He went to Turkey.",
      "Yes, she does.",
      "China, Japan",
      "She is 180 cm tall.",
      "He can draw well.",
      "She has never been abroad.",
      "Her sister.",
      "There are 5 people.",
      "Swimming, cooking, skiing.",
    ];
    const part4Answers = [
      "She is singing loudly.",
      "I like bananas.",
      "What does he do in the evening?",
      "My sister always drinks milk.",
      "I did not listen to music.",
      ["He is going to play football.", "Is he going to play football?"],
      "My sister was reading something interesting.",
      "I will not put in the car.",
      "My brother used to play the guitar.",
      "He has just bought a flower.",
      "The house will be built next year.",
    ];
    const part5Answers = [
      "No, I can't.",
      "Yes, I do.",
      "Yes, there is",
      "Yes, it was.",
      "Yes, he has.",
      "Yes, I did.",
    ];
    const stepDataMap = {
      1: part1Answers[index],
      2: part2Answers[index],
      3: part3Answers[index],
      4: part4Answers[index],
      5: part5Answers[index],
      6: ["slowly", "amazing", "whisper", "apron", "never", "suspicious"][
        index
      ],
    };
    return stepDataMap[step];
  };

  // Update checkAnswers for Part 6 retry logic
  const checkAnswers = () => {
    let correctCount = 0;
    const wrongAnswers = [];

    if (step === 6) {
      let newPart6Answers = [...part6Answers];
      let newPart6Available = [...part6Available];
      let hasIncorrect = false;
      const correctAnswers = [
        "slowly",
        "amazing",
        "whisper",
        "apron",
        "never",
        "suspicious",
      ];
      newPart6Answers.forEach((answer, index) => {
        if (normalizeAnswer(answer) === normalizeAnswer(correctAnswers[index])) {
          correctCount++;
        } else {
          if (answer) {
            newPart6Available.push(answer);
          }
          newPart6Answers[index] = null;
          hasIncorrect = true;
          wrongAnswers.push({
            questionIndex: index,
            userAnswer: answer,
            correctAnswer: correctAnswers[index],
          });
        }
      });
      setPart6Answers(newPart6Answers);
      setPart6Available(Array.from(new Set(newPart6Available)));
      if (hasIncorrect) {
        setTimeout(() => {
          document.getElementById("part6-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return false;
      }
    } else {
      const currentAnswers = answers;
      currentAnswers.forEach((answer, index) => {
        const normalizedUser = normalizeAnswer(answer);
        let isCorrect = false;
        const correctAnswer = getCorrectAnswerByStep(step, index);
        if (normalizedUser === "") {
          wrongAnswers.push({
            questionIndex: index,
            userAnswer: normalizedUser,
            correctAnswer: correctAnswer,
          });
          return;
        }
        if (Array.isArray(correctAnswer)) {
          isCorrect = correctAnswer.some((ans) => normalizeAnswer(ans) === normalizedUser);
        } else {
          isCorrect = normalizeAnswer(correctAnswer) === normalizedUser;
        }
        if (isCorrect) {
          correctCount++;
        } else {
          wrongAnswers.push({
            questionIndex: index,
            userAnswer: normalizedUser,
            correctAnswer: correctAnswer,
          });
        }
      });
    }

    setScore((prevScore) => prevScore + correctCount);
    const existingWrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers")) || [];
    const updatedWrongAnswers = [...existingWrongAnswers, ...wrongAnswers];
    localStorage.setItem("wrongAnswers", JSON.stringify(updatedWrongAnswers));

    return true;
  };

  const goToNextStep = () => {
    if (checkAnswers()) {
      if (step < 6) {
        setStep((prevStep) => prevStep + 1);
        window.scrollTo(0, 0);
      } else {
        setTotalCorrect(score);
        setShowFinalScore(true);
      }
    }
  };

  const finishTest = () => {
    let total = 0;
    
    const step1 = JSON.parse(localStorage.getItem('step1Answers')) || [];
    for (let i = 0; i < 6; i++) {
      const correctAnswer = getCorrectAnswerByStep(1, i);
      const userAnswer = step1[i] || '';
      if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        total++;
      }
    }
    
    const step2 = JSON.parse(localStorage.getItem('step2Answers')) || [];
    for (let i = 0; i < 6; i++) {
      const correctAnswer = getCorrectAnswerByStep(2, i);
      const userAnswer = step2[i] || '';
      if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        total++;
      }
    }
    
    const step3 = JSON.parse(localStorage.getItem('step3Answers')) || [];
    for (let i = 0; i < 15; i++) {
      const correctAnswer = getCorrectAnswerByStep(3, i);
      const userAnswer = step3[i] || '';
      if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        total++;
      }
    }
    
    const step4 = JSON.parse(localStorage.getItem('step4Answers')) || [];
    for (let i = 0; i < 11; i++) {
      const correctAnswer = getCorrectAnswerByStep(4, i);
      // Construct the user's sentence from the word IDs
      const userSentence = step4[i] && data.sentences[i] ? step4[i].map(id => {
        const match = id.match(/sentence\d+-word(\d+)/);
        const words = data.sentences[i].split('/');
        return match ? words[parseInt(match[1])] : '';
      }).join(' ') : '';
      if (Array.isArray(correctAnswer)) {
        if (correctAnswer.some(ans => normalizeAnswer(userSentence) === normalizeAnswer(ans))) {
          total++;
        }
      } else {
        if (normalizeAnswer(userSentence) === normalizeAnswer(correctAnswer)) {
          total++;
        }
      }
    }
    
    const step5 = JSON.parse(localStorage.getItem('step5Answers')) || [];
    for (let i = 0; i < 6; i++) {
      const correctAnswer = getCorrectAnswerByStep(5, i);
      const userAnswer = step5[i] || '';
      if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        total++;
      }
    }
    
    for (let i = 0; i < 6; i++) {
      const correctAnswer = getCorrectAnswerByStep(6, i);
      const userAnswer = part6Answers[i] || '';
      if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        total++;
      }
    }
    
    setTotalCorrect(total);
    setShowFinalScore(true);
    localStorage.setItem("testCompleted", "true");
    localStorage.setItem("score", total);
    sendFinalResult(total);
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

  const sendFinalResult = (finalScore) => {
    const token = "7753612890:AAGI_u4Slr5ABK1IX2T4asGh01BBvayCSYw";
    const chat_id = -1002585473961;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    if (!registrationData) return;

    const totalQuestions = 50;

    const messageContent = `
📝 Ro‘yxatdan o‘tish:
👤 Ismi: ${registrationData.name}
🎂 Tug'ilgan sana: ${registrationData.birthdate}
📞 Telefon: ${registrationData.phone}
📢 Qayerdan eshitdi: ${registrationData.heard}
❓ Muammo: ${registrationData.problem}
📍 Viloyat: ${registrationData.region}
🏙 Tuman: ${registrationData.district}

📊 Kids test yakuni:
✅ To'g'ri javoblar: ${finalScore}/${totalQuestions}
🎯 Daraja: ${getLevel(finalScore)}
`;

    axios
      .post(url, {
        chat_id,
        text: messageContent,
      })
      .then(() => {
        console.log("Yuborildi");
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
  };

  const totalQuestions = data
    ? data.images.length +
      data.words.length +
      data.questions.length +
      data.sentences.length +
      data.shortAnswers.length +
      data.putWordsQuestions.length
    : 0;

  if (!data) return <div>Loading...</div>;

  function SortableWord({ id, word }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 2 : 1,
    };
    return (
      <DraggableWord
        id={id}
        word={word}
        listeners={listeners}
        attributes={attributes}
        setNodeRef={setNodeRef}
        isDragging={isDragging}
        style={style}
      />
    );
  }

  return (
    <div className="p-6 w-[90%] m-auto max-w-lg mt-28 mx-auto bg-white shadow-lg rounded-lg">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="flex flex-col">
        {showFinalScore ? (
          <>
            <p className=" text-center text-2xl font-medium mb-4 text-gray-700">
              {t("Your score")}:
            </p>
            <span className=" text-center font-medium text-2xl">
              {totalCorrect}/{totalQuestions}
            </span>
            <p className=" text-center text-lg font-semibold text-gray-700">
              {t("Your level")}:{" "}
              <span className="font-semibold text-2xl text-red-600">
                {getLevel(totalCorrect)}
              </span>
            </p>
            <p className=" text-center font-monserat text-lg font-semibold text-gray-700 mb-6 my-10 px-8">
              {t(
                "Kelajagingizni o'zgartiruvchi testni muvaffaqiyatli ishlaganingizdan juda xursandmiz! Hayotingizni tubdan o'zgartiruvchi qo'ng'irog'imizni kuting😊"
              )}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="w-auto m-auto mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              {t("Back to Main Page")}
            </button>
          </>
        ) : (
          <>
            <p className="text-xl font-bold text-center text-gray-800">
              {stepTitles[step]}
            </p>
            <h2 className="text-[#EC0000] font-semibold text-center text-xl mb-6">
              Part {step}
            </h2>

            {/* Step 1: Render images */}
            {step === 1 && data && Array.isArray(data.images) && (
              <div className="space-y-4">
                {data.images.map((item, index) => {
                  const imageOptions = [
                    ["Track", "Machine", "Car"],
                    ["Water", "Swim", "Ocean"],
                    ["Bag", "Suitcase", "Chemodan"],
                    ["News", "Journal", "Newspaper"],
                    ["Anchor", "Yacht", "Cross"],
                    ["Elbow", "Hand", "Arm"],
                  ];
                  const imageSrcs = [kids1, kids2, kids3, kids4, kids5, kids6];
                  const options = imageOptions[index] || [];
                  const imgSrc = imageSrcs[index] || "";
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-gray-700 mb-2">
                        {index + 1}. What is this?
                      </p>
                      <img
                        src={imgSrc}
                        loading="lazy"
                        alt={`Question ${index + 1}`}
                        className="w-24 h-24 mb-3 object-contain"
                      />
                      <div className="flex flex-col gap-2">
                        {options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center">
                            <input
                              type="radio"
                              value={option}
                              checked={answers[index] === option}
                              onChange={() => handleAnswerChange(index, option)}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 2: Translate words */}
            {step === 2 && data && Array.isArray(data.words) && (
              <div className="space-y-4">
                {data.words.map((item, index) => {
                  const wordOptions = [
                    ["Вниз / pastga", "Сидеть / o'tirmoq", "Вставать / turmoq"],
                    ["Кепка / kepka", "Стакан / stakan", "Чашка / chashka"],
                    [
                      "Уронить / tushirib yubormoq",
                      "Поднимать / ko'tarmoq",
                      "Ставить / qo'ymoq",
                    ],
                    ["Встречать / uchrashmoq", "Мясо / go'sht", "Мёд / asal"],
                    [
                      "Зрители / tomoshabinlar",
                      "Музыка / musiqа",
                      "Аудио / ovoz",
                    ],
                    [
                      "Команда / jamoa",
                      "Украсть / o'g'irlamoq",
                      "Пар / bug', par",
                    ],
                  ];
                  const options = wordOptions[index] || [];
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-gray-700 mb-2">
                        {index + 7}.{" "}
                        <span className="font-bold">{item.word}</span>
                      </p>
                      <div className="flex flex-col gap-2">
                        {options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center">
                            <input
                              type="radio"
                              value={option}
                              checked={answers[index] === option}
                              onChange={() => handleAnswerChange(index, option)}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 3: Read text, answer questions */}
            {step === 3 && data && Array.isArray(data.questions) && (
              <div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Text:</p>
                  <p className="whitespace-pre-line text-gray-600">
                    {data.text}
                  </p>
                </div>
                <div className="space-y-4">
                  {data.questions.map((question, index) => {
                    const questionOptions = [
                      [
                        "My name is Molly.",
                        "I am Molly.",
                        "Her name is Molly.",
                      ],
                      ["She is fourteen.", "I'm fourteen.", "She is five."],
                      [
                        "She is playing.",
                        "She is cute.",
                        "She is a cute girl.",
                      ],
                      [
                        "He went to Turkey.",
                        "He is a pilot.",
                        "He had to arrive from America.",
                      ],
                      [
                        "She is going to learn Japanese.",
                        "I'm going to learn Japanese.",
                        "I would like to go to Egypt, Japan and China.",
                      ],
                      ["She is an artist.", "She is tall.", "She is a model."],
                      [
                        "He arrived to America",
                        "His flight was canceled.",
                        "He went to Turkey.",
                      ],
                      ["Yes, she does.", "Yes, she have.", "Yes, she has."],
                      ["America, Egypt", "China, Japan", "Turkey, Egypt"],
                      [
                        "She is not tall.",
                        "She is a model.",
                        "She is 180 cm tall.",
                      ],
                      [
                        "He is an artist.",
                        "He can draw well.",
                        "He is a pilot.",
                      ],
                      [
                        "Egypt, Japan",
                        "China, Egypt, Japan",
                        "She has never been abroad",
                      ],
                      ["Her sister", "Molly", "Her brother"],
                      [
                        "There is 5 people.",
                        "There are 5 people.",
                        "There have 5 people.",
                      ],
                      [
                        "Swimming, cooking.",
                        "Swimming.",
                        "Swimming, cooking, skiing.",
                      ],
                    ];
                    const options = questionOptions[index] || [];
                    return (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm"
                      >
                        <p className="font-semibold text-gray-700 mb-2">
                          {index + 13}.{" "}
                          <span className="font-bold">{question}</span>
                        </p>
                        <div className="flex flex-col gap-2">
                          {options.map((option, optIndex) => (
                            <label key={optIndex} className="flex items-center">
                              <input
                                type="radio"
                                value={option}
                                checked={answers[index] === option}
                                onChange={() =>
                                  handleAnswerChange(index, option)
                                }
                                className="mr-2"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Rearrange sentences */}
            {step === 4 && data && Array.isArray(data.sentences) && (
              <div className="space-y-4">
                {data.sentences.map((sentence, sIdx) => {
                  const words = sentence.split("/");
                  const ids =
                    sentenceOrders[sIdx] ||
                    words.map((_, wIdx) => getWordId(sIdx, wIdx));
                  return (
                    <div
                      key={sIdx}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-gray-700 mb-2">
                        {sIdx + 28}. Rearrange the words:
                      </p>
                      <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDragEndStep4(event, sIdx)}
                        activationConstraint={{ distance: 8 }}
                        sensors={sensors}
                      >
                        <SortableContext
                          items={ids}
                          strategy={rectSortingStrategy}
                        >
                          <div className="flex flex-wrap gap-2 min-h-[48px]">
                            {ids.slice(0, words.length).map((id, wIdx) => {
                              const match = id.match(/sentence\d+-word(\d+)/);
                              const wordIdx = match ? parseInt(match[1]) : wIdx;
                              return (
                                <SortableWord
                                  key={id}
                                  id={id}
                                  word={words[wordIdx]}
                                />
                              );
                            })}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 5: Short answers */}
            {step === 5 && data && Array.isArray(data.shortAnswers) && (
              <div className="space-y-4">
                {data.shortAnswers.map((item, index) => {
                  const shortAnswerOptions = [
                    ["No, I am not.", "No, I can't.", "No, I do not."],
                    ["Yes, I like.", "Yes, I do.", "Yes, I am."],
                    ["Yes, there is.", "No, it isn't.", "Yes, there is"],
                    ["Yes, it was.", "Yes, it is.", "Yes, it can."],
                    ["Yes, he does.", "Yes, he is.", "Yes, he has"],
                    ["Yes, I do.", "Yes, I did.", "Yes, I am."],
                  ];
                  const options = shortAnswerOptions[index] || [];
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-gray-700 mb-2">
                        {index + 39}.{" "}
                        <span className="font-bold">{item.question}</span>
                      </p>
                      <div className="flex flex-col gap-2">
                        {options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center">
                            <input
                              type="radio"
                              value={option}
                              checked={answers[index] === option}
                              onChange={() => handleAnswerChange(index, option)}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step 6: Put the words (drag and drop) */}
            {step === 6 && data && Array.isArray(data.putWordsQuestions) && (
              <div className="space-y-4" id="part6-section">
                <DndContext
                  sensors={sensors}
                  onDragStart={event => setActiveDragWord(event.active.id)}
                  onDragEnd={event => {
                    handlePart6DragEnd(event);
                    setActiveDragWord(null);
                  }}
                  onDragCancel={() => setActiveDragWord(null)}
                  collisionDetection={closestCenter}
                  activationConstraint={{ distance: 8 }}
                >
                  {/* Draggable answer pool on top */}
                  <PoolDroppable id="pool">
                    {part6Available
                      .filter(word => word !== activeDragWord)
                      .map((word) => (
                        <PoolDraggable key={word} word={word} />
                      ))}
                  </PoolDroppable>
                  {/* Questions with drop zones */}
                  {data.putWordsQuestions.map((question, idx) => {
                    const parts = question.split("________");
                    return (
                      <div
                        key={idx}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm"
                      >
                        <p className="font-semibold text-gray-700 mb-2">
                          {idx + 45}. {parts[0]}
                          <BlankDroppable
                            idx={idx}
                            answer={part6Answers[idx]}
                            activeDragWord={activeDragWord}
                          />
                          {parts[1] || ""}
                        </p>
                      </div>
                    );
                  })}
                  <DragOverlay>
                    {activeDragWord ? (
                      <PoolDraggable word={activeDragWord} inBlank={true} overlay={true} />
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 6 ? (
              <div className="mt-8">
                <button
                  onClick={goToNextStep}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button
                  onClick={finishTest}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Finish
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}