import React, { useState, useEffect } from 'react';

const Part2 = ({ onComplete, onPrevious, currentQuestion, setCurrentQuestion, answers, updateAnswers }) => {
  const [currentTest, setCurrentTest] = useState(currentQuestion || 7);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const questions = [
    "Sit",
    "Cups",
    "Drop",
    "Meat",
    "Audience",
    "Steam"
  ];

  useEffect(() => {
    setAnswer(answers[currentTest - 7] || '');
  }, [currentTest, answers]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s']*$/.test(value)) {
      setAnswer(value);
      setError('');
    } else {
      setError('Only letters are allowed!');
    }
  };

  const handleSubmit = () => {
    if (answer.trim() !== '' && /^[a-zA-Z\s]+$/.test(answer)) {
      updateAnswers(currentTest - 7, answer);

      if (currentTest < 12) {
        setCurrentTest(currentTest + 1);
        setCurrentQuestion(currentTest + 1);
        setAnswer('');
        setError('');
      } else {
        onComplete();
      }
    } else if (answer.trim() === '') {
      setError('Answer cannot be empty!');
    }
  };

  const handlePrevious = () => {
    if (currentTest > 7) {
      updateAnswers(currentTest - 7, answer); // Save current answer before moving
      setCurrentTest(currentTest - 1);
      setCurrentQuestion(currentTest - 1);
      setAnswer(answers[currentTest - 8] || '');
      setError('');
    } else if (currentTest === 7) {
      updateAnswers(currentTest - 7, answer); // Save current answer before moving
      onPrevious('part1', 6);
    }
  };

  return (
    <>
      <button
        onClick={handlePrevious}
        className={`text-xl flex flex-row items-center border-2 p-1 max-[550px]:px-2 gap-2 font-medium rounded-lg mt-[-20px] outline-none ml-1 hover:bg-gray-100`}
      >
        <i className="fa-solid fa-chevron-left text-xl mt-1"></i>
        <p className='max-[550px]:hidden'>Previous</p>
      </button>

      <h2 className="text-[#EC0000] font-medium text-2xl xl:text-3xl mt-2">Part 2</h2>
      <h3 className='text-center font-medium text-xl'>Translate the words:</h3>

      {currentTest >= 7 && currentTest <= 12 && (
        <div className="test-item flex flex-row items-end mt-8 mb-16 w-[270px] m-auto">
          <p className="text-2xl font-medium text-start">{currentTest}.</p>
          <p className="text-2xl font-medium ml-2 mr-2 text-center">{questions[currentTest - 7]}</p>
          <input
            required
            minLength={1}
            maxLength={20}
            type="text"
            value={answer}
            onChange={handleInputChange}
            className="w-[70%] m-auto border-b-2 mt-[-7px] border-black outline-none text-2xl font-normal text-center"
          />
        </div>
      )}

      {currentTest <= 12 && (
        <div className="mb-[30px] mt-[-20px] flex flex-col items-center gap-4">
          {error && (
            <p className="text-red-600 text-lg">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            className="bg-[#EC0000] text-white text-xl px-6 py-2 outline-none rounded-lg"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Part2;