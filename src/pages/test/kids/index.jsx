import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import kids1 from '../../../assets/kids1.png';
import kids2 from '../../../assets/kids2.png';
import kids3 from '../../../assets/kids3.png';
import kids4 from '../../../assets/kids4.png';
import kids5 from '../../../assets/kids5.png';
import kids6 from '../../../assets/kids6.png';

const images = [
  { src: kids1, answer: "swimming" },
  { src: kids2, answer: "suitcase" },
  { src: kids3, answer: "newspaper" },
  { src: kids4, answer: "anchor" },
  { src: kids5, answer: "car" },
  { src: kids6, answer: "elbow" },
];

const words = [
  { word: "Sit", translation: "o'tirish" },
  { word: "Cups", translation: "stakanlar" },
  { word: "Drop", translation: "tushirish" },
  { word: "Meat", translation: "go'sht" },
  { word: "Audience", translation: "tomoshabinlar" },
  { word: "Steam", translation: "bug'" },
];

const text = `
I am Molly. I’m fourteen. My hobbies are swimming, cooking and skiing. I have got a dog and a cat. We 
have five family members in our family including me. My mother is a model. She is 180 cm tall. My
father is a pilot. He had to arrive from America yesterday, but his flight was canceled and he went to 
Turkey. My brother is an artist. He can draw well. My sister is a cute girl. She is playing now. 
I’m older than my sister, so I don’t like playing dolls. I have a lot of dreams. I have never been abroad. I
would like to go to Egypt, Japan and China. I’m going to learn Japanese next year.
`;

const questions = [
  "What’s her name?",
  "How old is she?",
  "What is her sister doing at the moment?",
  "What does her father do?",
  "What’s her future plan?",
  "What’s her mother’s job?",
  "What did her father do yesterday?",
  "Does she have any pets?",
  "Which countries does she want to visit?",
  "How tall is her mother?",
  "What can her brother do?",
  "Which countries has Molly been to?",
  "Who is younger? Molly or her sister?",
  "How many people are there in her family?",
  "What does Molly like doing?"
];

const correctAnswers = [
  "Molly",
  "Fourteen",
  "Playing",
  "Pilot",
  "Learn Japanese",
  "Model",
  "Went to Turkey",
  "Yes, she has a dog and a cat",
  "Egypt, Japan, China",
  "180 cm",
  "Draw well",
  "She has never been abroad",
  "Her sister is younger",
  "Five",
  "Swimming, cooking, skiing"
];

const sentences = [
  "loudly/singing/she/is",
  "bananas/I/like",
  "does/do/evening/he/what/in/the",
  "always/milk/my sister/drinks",
  "did/listen/not/to/I/music",
  "is/he/play/to/football/going",
  "my/sister/something/reading/interesting/was",
  "will/in/car/the/I/not/put/it",
  "used to/my brother/play/the guitar",
  "he/bought/a/just/flower/has",
  "will/built/next/year/be/the/house",
];

const shortAnswers = [
  { question: "Can you fly?", correct: "No, I can't." },
  { question: "Do you like bananas?", correct: "Yes, I do." },
  { question: "Is there a book on the table?", correct: "Yes, there is." },
  { question: "Was it sunny?", correct: "Yes, it was." },
  { question: "Has he brushed her hair?", correct: "Yes, he has." },
  { question: "Did you do your homework?", correct: "Yes, I did." },
];

const wordsTask = [
  "whisper",
  "suspicious",
  "slowly",
  "never",
  "amazing",
  "apron",
];

const putWordsQuestions = [
  "He is running _____________ .",
  "This book is ____________. I like it.",
  "He used to __________ while his little brother was sleeping.",
  "A maid was wearing a white _______________ .",
  "He _______ drinks coffee. He hates it.",
  "That man is very __________. I haven’t seen him before.",
];

const putWordsAnswers = [
  "slowly",
  "amazing",
  "whisper",
  "apron",
  "never",
  "suspicious",
];

export default function KidsEnglishTask() {
  const [step, setStep] = useState(() => parseInt(localStorage.getItem('currentStep')) || 1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const initializeAnswers = () => {
    const savedAnswers = JSON.parse(localStorage.getItem(`step${step}Answers`)) || [];
    if (step === 1) return savedAnswers.length ? savedAnswers : Array(images.length).fill("");
    if (step === 2) return savedAnswers.length ? savedAnswers : Array(words.length).fill("");
    if (step === 3) return savedAnswers.length ? savedAnswers : Array(questions.length).fill("");
    if (step === 4) return savedAnswers.length ? savedAnswers : Array(sentences.length).fill("");
    if (step === 5) return savedAnswers.length ? savedAnswers : Array(shortAnswers.length).fill("");
    if (step === 6) return savedAnswers.length ? savedAnswers : Array(putWordsQuestions.length).fill("");
    return [];
  };

  useEffect(() => {
    setAnswers(initializeAnswers(step));
    localStorage.setItem('currentStep', step);
  }, [step]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value || "";
    setAnswers(newAnswers);
    localStorage.setItem(`step${step}Answers`, JSON.stringify(newAnswers));
  };

  const checkAnswers = () => {
    if (answers.every((answer) => (answer?.trim?.() || "") === "")) {
      setError(true);
      return false;
    }

    let correctCount = 0;
    answers.forEach((answer, index) => {
      const trimmedAnswer = (answer?.trim?.().toLowerCase()) || "";

      if (
        step === 1 &&
        images[index]?.answer?.toLowerCase() &&
        trimmedAnswer === images[index].answer.toLowerCase()
      ) {
        correctCount++;
      } else if (
        step === 2 &&
        words[index]?.translation?.toLowerCase() &&
        trimmedAnswer === words[index].translation.toLowerCase()
      ) {
        correctCount++;
      } else if (
        step === 3 &&
        correctAnswers[index]?.toLowerCase() &&
        trimmedAnswer === correctAnswers[index].toLowerCase()
      ) {
        correctCount++;
      } else if (
        step === 4 &&
        sentences[index]?.toLowerCase() &&
        trimmedAnswer === sentences[index].toLowerCase()
      ) {
        correctCount++;
      } else if (
        step === 5 &&
        shortAnswers[index]?.correct?.toLowerCase() &&
        trimmedAnswer === shortAnswers[index].correct.toLowerCase()
      ) {
        correctCount++;
      } else if (
        step === 6 &&
        putWordsAnswers[index]?.toLowerCase() &&
        trimmedAnswer === putWordsAnswers[index].toLowerCase()
      ) {
        correctCount++;
      }
    });

    setScore((prevScore) => prevScore + correctCount);
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

  const totalQuestions = images.length + words.length + questions.length + sentences.length + shortAnswers.length + putWordsQuestions.length;

  return (
    <div className="p-6 max-w-lg mt-20 mx-auto bg-white shadow-lg rounded-lg">
      {showFinalScore ? (
        <div className="text-center flex flex-col p-6">
          <p className="text-2xl font-medium mb-4 text-gray-700">
            Your score:
          </p>
          <span className="font-medium text-2xl">
            {totalCorrect}/{totalQuestions}
          </span>
          <p className="text-lg font-semibold text-gray-700">
            Your level: {" "}
            <span className="font-semibold text-2xl text-red-600">
              {getLevel(totalCorrect)}
            </span>
          </p>
          <button
            onClick={() => {
              localStorage.clear(); // Clear the localStorage
              navigate("/"); // Navigate to the main page
            }}
            className="max-w-[200px] w-full m-auto mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Back to Main Page
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

          {step === 1 && (
            <div className="space-y-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 1}. What is this?
                  </p>
                  <img
                    src={image.src}
                    alt={`Question ${index + 1}`}
                    className="w-24 h-24 mx-auto mb-3 object-contain"
                  />
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {words.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 7}. {item.word}
                  </p>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-lg font-semibold mb-2 text-gray-700">
                  Read the text:
                </p>
                <p className="whitespace-pre-line text-gray-600">{text}</p>
              </div>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-semibold text-gray-700 mb-2">
                      {index + 13}. {question}
                    </p>
                    <input
                      type="text"
                      value={answers[index]}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-[80%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {sentences.map((sentence, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 17}. {sentence}
                  </p>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) =>
                      handleAnswerChange(index, e.target.value)
                    }
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              {shortAnswers.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 28}. {item.question}
                  </p>
                  <input
                    type="text"
                    value={answers[28 + index] || ""}
                    onChange={(e) =>
                      handleAnswerChange(28 + index, e.target.value)
                    }
                    className="w-[60%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              {putWordsQuestions.map((question, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-700 mb-2">
                    {index + 34}. {question}
                  </p>
                  <input
                    type="text"
                    value={answers[34 + index] || ""}
                    onChange={(e) => handleAnswerChange(34 + index, e.target.value)}
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