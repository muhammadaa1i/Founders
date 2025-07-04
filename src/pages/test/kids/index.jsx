import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import data from "../../../../public/servers/kids.json";
import kids1 from '../../../assets/kids1.png';
import kids2 from '../../../assets/kids2.png';
import kids3 from '../../../assets/kids3.png';
import kids4 from '../../../assets/kids4.png';
import kids5 from '../../../assets/kids5.png';
import kids6 from '../../../assets/kids6.png';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndContext, closestCenter, useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable, SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

function DraggableWord({ id, word, listeners, attributes, isDragging, setNodeRef, style }) {
  return (
    <span
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 12px',
        margin: '0 6px 6px 0',
        background: '#f3f4f6', // always light gray
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        cursor: 'grab',
        fontWeight: 500,
        fontSize: 16,
        minWidth: 40,
        maxWidth: 160,
        userSelect: 'none',
        transition: 'background 0.2s, box-shadow 0.2s',
        ...style,
      }}
    >
      {word}
    </span>
  );
}

function getWordId(sentenceIdx, wordIdx) {
  return `sentence${sentenceIdx}-word${wordIdx}`;
}

function normalizeAnswer(str) {
  if (!str) return '';
  // Lowercase, trim, replace multiple spaces, remove leading/trailing punctuation
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^[.,!?;:()\[\]{}'"-]+|[.,!?;:()\[\]{}'"-]+$/g, '');
}

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
  const navigate = useNavigate();
  const kidsimages = [kids1, kids2, kids3, kids4, kids5, kids6];
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

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
        const words = data.sentences[sIdx].split('/');
        return idArr.map(id => {
          const match = id.match(/sentence\d+-word(\d+)/);
          return match ? words[parseInt(match[1])] : '';
        }).join(' ');
      });
      setAnswers(joined);
      localStorage.setItem('step4Answers', JSON.stringify(sentenceOrders));
    }
  }, [sentenceOrders, step]);

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
    let correctCount = 0;
    const wrongAnswers = [];

    // Use part6Answers for step 6, otherwise use answers
    const currentAnswers = (step === 6) ? part6Answers : answers;

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
        window.scrollTo(0, 0);
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
      localStorage.setItem("testCompleted", "true");
      localStorage.setItem("score", score);

      sendFinalResult(score);
      setTimeout(() => {
        localStorage.removeItem("testCompleted");
        localStorage.removeItem("score");
        localStorage.removeItem("currentStep");
        localStorage.removeItem("wrongAnswers");
        for (let i = 1; i <= 6; i++) {
          localStorage.removeItem(`step${i}Answers`);
        }
      }, 1000);
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

    axios.post(url, {
      chat_id,
      text: messageContent,
    }).then(() => {
      console.log("Yuborildi");
    }).catch((err) => {
      console.error("Xatolik:", err);
    });
  };

  const totalQuestions = data ? (data.images.length + data.words.length + data.questions.length +
    data.sentences.length + data.shortAnswers.length + data.putWordsQuestions.length) : 0;

  if (!data) return <div>Loading...</div>;

  function SortableWord({ id, word }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
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

  const handleDragEndStep4 = (event, sentenceIdx) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSentenceOrders(prev => {
      const newOrders = [...prev];
      newOrders[sentenceIdx] = arrayMove(newOrders[sentenceIdx],
        newOrders[sentenceIdx].indexOf(active.id),
        newOrders[sentenceIdx].indexOf(over.id)
      );
      return newOrders;
    });
  };

  // --- Part 6 Drag and Drop State ---
  const part6Words = ["Whisper", "Suspicious", "Slowly", "Never", "Amazing", "Apron"];
  const [part6Available, setPart6Available] = useState(part6Words);
  const [part6Answers, setPart6Answers] = useState(Array(6).fill(null));

  // Draggable for answer pool
  function PoolDraggable({ word }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: word });
    // Lowercase first letter for display
    const displayWord = word ? word.charAt(0).toLowerCase() + word.slice(1) : '';
    return (
      <span
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 12px',
          margin: '0 6px 6px 0',
          background: '#f3f4f6',
          border: '2px solid #000', // match input border
          borderRadius: '6px', // match input border radius
          cursor: 'grab',
          fontWeight: 500,
          fontSize: 16,
          minWidth: 40,
          maxWidth: 160,
          userSelect: 'none',
          opacity: isDragging ? 0.5 : 1,
          zIndex: isDragging ? 2 : 1,
          boxShadow: isDragging ? '0 2px 8px #aaa' : undefined,
          transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
          transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        }}
      >
        {displayWord}
      </span>
    );
  }

  function PoolDroppable({ children }) {
    const { setNodeRef, isOver } = useDroppable({ id: 'answers-pool' });
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

  function BlankDroppable({ idx, answer, onRemove, children }) {
    const { setNodeRef, isOver } = useDroppable({ id: `blank-${idx}` });
    const hasAnswer = Boolean(answer);
    return (
      <span
        ref={setNodeRef}
        style={{
          display: 'inline-block',
          minWidth: 80,
          minHeight: 36,
          border: hasAnswer ? 'none' : (isOver ? '2px solid #EC0000' : '2px solid #000'),
          borderRadius: 6,
          margin: '0 8px',
          background: hasAnswer ? 'transparent' : '#fff',
          verticalAlign: 'middle',
          textAlign: 'center',
          transition: 'border 0.2s, background 0.2s',
          padding: hasAnswer ? 0 : '4px 12px',
          boxSizing: 'border-box',
          fontSize: 16,
          lineHeight: '28px',
          cursor: hasAnswer ? 'pointer' : 'default',
        }}
      >
        {hasAnswer ? (
          <PoolDraggable word={answer} />
        ) : children}
      </span>
    );
  }

  // Handler for drag end in Part 6
  const handlePart6DragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const word = active.id;
    // If dropped on a blank
    if (over.id.startsWith('blank-')) {
      const idx = parseInt(over.id.replace('blank-', ''));
      setPart6Answers(prev => {
        const newAnswers = [...prev];
        // Remove word from previous blank if it was there
        const prevIdx = newAnswers.indexOf(word);
        if (prevIdx !== -1) newAnswers[prevIdx] = null;
        // If this blank already has a word, return it to pool
        if (newAnswers[idx]) setPart6Available(avail => [...avail, newAnswers[idx]]);
        newAnswers[idx] = word;
        return newAnswers;
      });
      setPart6Available(prev => prev.filter(w => w !== word));
    } else if (over.id === 'answers-pool') {
      // If dropped back to pool, remove from blanks
      setPart6Answers(prev => prev.map(w => (w === word ? null : w)));
      if (!part6Available.includes(word)) setPart6Available(prev => [...prev, word]);
    }
  };

  // Keep available words in sync with answers
  useEffect(() => {
    setPart6Available(part6Words.filter(w => !part6Answers.includes(w)));
    // eslint-disable-next-line
  }, [part6Answers]);

  return (
    <div className="p-6 w-[90%] m-auto max-w-lg mt-28 mx-auto bg-white shadow-lg rounded-lg">
      {showFinalScore ? (
        <>
          {showConfetti && <Confetti width={width} height={height} />}
          <div className="text-center flex flex-col">
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
            <p className="font-monserat text-lg font-semibold text-gray-700 mb-6 my-10 px-8">{t("Kelajagingizni o'zgartiruvchi testni muvaffaqiyatli ishlaganingizdan juda xursandmiz! Hayotingizni tubdan o'zgartiruvchi qo'ng'irog'imizni kuting😊")}</p>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="w-auto m-auto mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              {t("Back to Main Page")}
            </button>
          </div>
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

          {/* Step 4: Render sentences as draggable word boxes */}
          {step === 4 && (
            <div className="space-y-4">
              {data.sentences.map((sentence, sIdx) => {
                const words = sentence.split('/');
                const ids = sentenceOrders[sIdx] || words.map((_, wIdx) => getWordId(sIdx, wIdx));
                return (
                  <div key={sIdx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="font-semibold text-gray-700 mb-2">
                      {sIdx + 28}. Rearrange the words:
                    </p>
                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={event => handleDragEndStep4(event, sIdx)}
                    >
                      <SortableContext
                        items={ids}
                        strategy={rectSortingStrategy}
                      >
                        <div className="flex flex-wrap gap-2 min-h-[48px]">
                          {ids.map((id, wIdx) => {
                            // Map id back to word index
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

          {/* Step 5: Render short answers */}
          {step === 5 && (
            <div className="space-y-4">
              {data.shortAnswers.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 39}. {item.question}
                  </p>
                  <p className="inline">{index === 0 ? "No, " : "Yes, "}</p>
                  <input
                    type="text"
                    value={answers[index] || ""}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[80%] min-[500px]:w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-left pl-3"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 6: Render put words questions as drag-and-drop fill-in-the-blank */}
          {step === 6 && (
            <div className="space-y-4">
              <DndContext onDragEnd={handlePart6DragEnd} collisionDetection={closestCenter}>
                {/* Draggable answer pool on top */}
                <PoolDroppable>
                  {part6Available.map((word) => (
                    <PoolDraggable key={word} word={word} />
                  ))}
                </PoolDroppable>
                {/* Questions with drop zones */}
                {data.putWordsQuestions.map((question, idx) => {
                  const parts = question.split("________");
                  return (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <p className="font-semibold text-gray-700 mb-2">
                        {idx + 45}. {parts[0]}
                        <BlankDroppable
                          idx={idx}
                          answer={part6Answers[idx]}
                          onRemove={(i) => {
                            setPart6Answers(prev => {
                              const newAnswers = [...prev];
                              if (newAnswers[i]) setPart6Available(avail => [...avail, newAnswers[i]]);
                              newAnswers[i] = null;
                              return newAnswers;
                            });
                          }}
                        >
                          {part6Answers[idx] && <PoolDraggable word={part6Answers[idx]} />}
                        </BlankDroppable>
                        {parts[1]}
                      </p>
                    </div>
                  );
                })}
              </DndContext>
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
      <ToastContainer />
    </div>
  );
}