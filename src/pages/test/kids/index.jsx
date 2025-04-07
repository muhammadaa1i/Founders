import { useState, useEffect } from "react";
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
I am Molly. I’m fourteen. My hobbies are swimming, cooking and skiing. I have got a dog and a cat. 
We have five family members in our family including me. My mother is a model. She is 180 cm tall. 
My father is a pilot. He had to arrive from America yesterday, but his flight was canceled and he went to Turkey. 
My brother is an artist. He can draw well. My sister is a cute girl. She is playing now. 
I’m older than my sister, so I don’t like playing dolls. I have a lot of dreams. I have never been abroad. 
I would like to go to Egypt, Japan and China. I’m going to learn Japanese next year.
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
  "Egypt, Japan, and China",
  "180 cm",
  "Draw well",
  "She has never been abroad",
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
  "Whisper",
  "Suspicious",
  "Slowly",
  "Never",
  "Amazing",
  "Apron",
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
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

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
  }, [step]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value || "";
    setAnswers(newAnswers);
    localStorage.setItem(`step${step}Answers`, JSON.stringify(newAnswers));
  };

  const checkAnswers = () => {
    if (answers.every((answer) => answer.trim() === "")) {
      alert("Please enter all answers!");
      return;
    }

    let newScore = score;
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (
        step === 1 &&
        answer.trim().toLowerCase() === images[index].answer.toLowerCase()
      ) {
        newScore++;
      } else if (
        step === 2 &&
        answer.trim().toLowerCase() === words[index].translation.toLowerCase()
      ) {
        newScore++;
      } else if (
        step === 3 &&
        answer.trim().toLowerCase() === correctAnswers[index].toLowerCase()
      ) {
        newScore++;
      } else if (
        step === 4 &&
        answer.trim().toLowerCase() ===
        sentences[index].replace(/\//g, " ").toLowerCase()
      ) {
        newScore++;
      } else if (
        step === 5 &&
        answer.trim().toLowerCase() ===
        shortAnswers[index].correct.toLowerCase()
      ) {
        newScore++;
      } else if (
        step === 6 &&
        answer.trim().toLowerCase() === putWordsAnswers[index].toLowerCase()
      ) {
        newScore++;
      }
    });
    newScore += correctCount;
    setScore(newScore);

    if (step < 6) {
      setStep(prevStep => prevStep + 1); // Update step
      setAnswers(initializeAnswers(step + 1)); // Preload next step answers
    } else {
      setTotalCorrect(newScore);
      setShowFinalScore(true);
    }
  };

  const goToNextStep = () => {
    checkAnswers();
    if (step < 6) {
      setStep(prevStep => prevStep + 1);
      setAnswers(initializeAnswers(step + 1));
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
      setAnswers(initializeAnswers(step - 1));
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

  const totalQuestions = images.length + words.length + questions.length + sentences.length + shortAnswers.length + putWordsQuestions.length;

  return (
    <div className="p-6 max-w-lg mt-20 mx-auto bg-white shadow-lg rounded-lg">
      {showFinalScore ? (
        <div className="text-center p-6">
          <p className="text-2xl font-bold mb-4 text-green-600">
            Test Completed!
          </p>
          <p className="text-lg text-gray-700">
            Your result: {" "}
            <span className="font-bold text-3xl text-red-600">
              {totalCorrect}/{totalQuestions}
            </span>
          </p>
          <button
            onClick={() => {
              setStep(1);
              setScore(0);
              setTotalCorrect(0);
              setShowFinalScore(false);
              setAnswers(initializeAnswers());
              for (let i = 1; i <= 6; i++) {
                localStorage.removeItem(`step${i}Answers`);
              }
            }}
            className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Restart Test
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

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm text-center"
                >
                  <img
                    loading="lazy"
                    src={image.src}
                    alt="question images"
                    className="w-28 h-28 mx-auto mb-3 object-contain"
                  />
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[80%] min-[400px]:w-[70%] min-[500px]:w-[60%] sm:w-[80%] m-auto border-b-2 border-black outline-none text-xl text-center"
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
                    {item.word}
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
                      {question}
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
                    {sentence.replace(/\//g, " ")}
                  </p>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[80%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
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
                    {item.question}
                  </p>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-[80%] m-auto border-b-2 border-black outline-none text-[16px] text-center"
                  />
                </div>
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              {putWordsQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-700 mb-2">{question}</p>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter word"
                  />
                </div>
              ))}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                  Available Words:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {wordsTask.map((word, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={goToPreviousStep}
              disabled={step === 1}
              className={`w-full bg-[#1d1a1a] text-white py-3 px-6 rounded-lg hover:bg-[#383333] transition duration-300 ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Previous
            </button>
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
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
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