import React, { useState, useEffect } from 'react';

const Part4 = ({ onComplete, onPrevious, currentQuestion, setCurrentQuestion, answers, updateAnswers }) => {
    const [currentTest, setCurrentTest] = useState(() => {
        return Math.max(28, Math.min(38, currentQuestion || 28));
    });
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const questions = [
        "loudly/singing/she/is",              // Q28
        "bananas/I/like",                    // Q29
        "does/do/evening/he/what/in/the",    // Q30
        "always/milk/my sister/drinks",      // Q31
        "did/listen/not/to/I/music",         // Q32
        "is/he/play/to/football/going",      // Q33
        "my/sister/something/reading/interesting/was", // Q34
        "will/in/car/the/I/not/put/it",      // Q35
        "used to/my brother/play/the guitar", // Q36
        "he/bought/a/just/flower/has",       // Q37
        "will/built/next/year/be/the/house"  // Q38
    ];

    useEffect(() => {
        setAnswer(answers[currentTest - 28] || '');
    }, [currentTest, answers]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) { // Allow only letters and spaces
            setAnswer(value);
            setError('');
        } else {
            setError('Only letters and spaces are allowed!');
        }
    };

    const handleSubmit = () => {
        if (answer.trim() === '') {
            setError('Answer cannot be empty!');
            return;
        }

        updateAnswers(currentTest - 28, answer);

        if (currentTest < 38) {
            setCurrentTest(currentTest + 1);
            setCurrentQuestion(currentTest + 1);
            setAnswer('');
            setError('');
        } else {
            onComplete();
        }
    };

    const handlePrevious = () => {
        if (answer.trim() !== '') {
            updateAnswers(currentTest - 28, answer);
        }
        if (currentTest > 28) {
            setCurrentTest(currentTest - 1);
            setCurrentQuestion(currentTest - 1);
            setAnswer(answers[currentTest - 29] || '');
            setError('');
        } else if (currentTest === 28) {
            onPrevious('part3', 27);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    className="text-xl flex flex-row border-2 p-1 max-[550px]:px-2 items-center gap-2 font-medium rounded-lg mt-[-20px] outline-none ml-1 hover:bg-gray-100"
                >
                    <i className="fa-solid fa-chevron-left text-xl mt-1"></i>
                    <p className="max-[550px]:hidden">Previous</p>
                </button>
                <h2 className="text-[#EC0000] font-medium text-2xl xl:text-3xl mt-2">Part 4</h2>
                <div className="w-[80px]"></div>
            </div>
            <h3 className="text-center font-medium text-xl">Make sentences from the words:</h3>

            {currentTest >= 28 && currentTest <= 38 && (
                <div className="test-item mt-4 mb-16 m-auto">
                    <span className='flex flex-row max-w-[450px] text-wrap m-auto'>
                        <p className="text-2xl font-medium">{currentTest}.</p>
                        <p className="text-2xl font-medium ml-4 ">
                            {questions[currentTest - 28]}
                        </p>
                    </span>
                    <input
                        required
                        minLength={1}
                        maxLength={25}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center mt-4"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {currentTest <= 38 && (
                <div className="mb-[30px] mt-[-20px]">
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

export default Part4;