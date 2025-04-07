import React, { useState, useEffect } from "react";
import questions from "./questions.json";

const General = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setCurrentQuestion(savedState.currentQuestion);
      setScore(savedState.score);
      setShowResult(savedState.showResult);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({ currentQuestion, score, showResult })
    );
  }, [currentQuestion, score, showResult]);

  const handleAnswer = (option) => {
    if (!option) return;
    setSelectedOption(option);

    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  // const restartQuiz = () => {
  //   setCurrentQuestion(0);
  //   setScore(0);
  //   setShowResult(false);
  //   setSelectedOption(null);
  //   localStorage.removeItem("quizState");
  // };

  const getLevel = (score) => {
    if (score <= 12) return "Beginner";
    if (score <= 23) return "Elementary";
    if (score <= 32) return "Pre-Intermediate";
    if (score <= 39) return "Intermediate";
    if (score <= 45) return "Upper-Intermediate";
    return "Advanced";
  };

  return (
    <div className="kids-main pt-28 pb-12 ">
      <div
        className="flex flex-col items-center justify-center w-[90%] max-w-5xl kids m-auto py-11 px-3 xl:px-10 min-[400px]:w-[80%] md:w-[70%] xl:w-[60%] h-auto rounded-2xl border-2 text-center border-[#EC0000]"
        style={{ boxShadow: "15px 15px 40px 0px #FF00004D" }}
      >
        {showResult ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-monserat font-medium text-3xl text-gray-800 mb-4">
              Your score:
            </h2>
            <p className="font-monserat font-semibold text-2xl text-center mb-2">
              {score} / {questions.length}
            </p>
            <p className="font-monserat text-xl font-semibold text-gray-700 mb-6">
              Your level: <span className="font-semibold text-red-600">{getLevel(score)}</span>
            </p>
            {/* <button
              onClick={restartQuiz}
              className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              Retry
            </button> */}
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-semibold mb-6 text-gray-900 pl-4">
              <span>{currentQuestion + 1}.</span> {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                  className={`block w-full py-3 rounded-xl text-lg font-medium transition-all shadow-md ${
                    selectedOption === option
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default General;
