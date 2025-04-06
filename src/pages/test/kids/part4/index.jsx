import React, { useState, useEffect } from 'react';

const Part4 = ({ onComplete, onPrevious, currentQuestion, setCurrentQuestion, answers, updateAnswers }) => {
    const [currentTest, setCurrentTest] = useState(currentQuestion || 28);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const questions = [
        "cat the mat on",              // Q28: "The cat on mat"
        "dog big runs fast",           // Q29: "The big dog runs fast"
        "bird sky blue flies",         // Q30: "The blue bird flies in the sky"
        "fish swims water in",         // Q31: "The fish swims in water"
        "sun hot shines bright",       // Q32: "The hot sun shines bright"
        "boy ball kicks hard",         // Q33: "The boy kicks the ball hard"
        "girl reads book quietly",     // Q34: "The girl reads the book quietly"
        "car red drives street",       // Q35: "The red car drives on the street"
        "tree tall grows garden",      // Q36: "The tall tree grows in the garden"
        "man old walks park",          // Q37: "The old man walks in the park"
        "rain falls sky heavy"         // Q38: "The heavy rain falls from the sky"
    ];

    // Function to check if all words from the question are used in the answer
    const areAllWordsUsed = (questionWords, answerWords) => {
        const questionWordSet = new Set(questionWords);
        const answerWordSet = new Set(answerWords.filter(word => word.length > 0));
        return [...questionWordSet].every(word => answerWordSet.has(word));
    };

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

        const questionWords = questions[currentTest - 28].split(' ');
        const answerWords = answer.trim().toLowerCase().split(/\s+/);

        if (!areAllWordsUsed(questionWords, answerWords)) {
            setError('You must use all the given words!');
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
            updateAnswers(currentTest - 28, answer); // Save current answer before moving
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
                    className={`text-xl flex flex-row border-2 p-1 items-center gap-2 font-medium rounded-lg mt-[-20px] outline-none ml-1 hover:bg-gray-100`}
                >
                    <i className="fa-solid fa-chevron-left text-xl mt-1"></i>
                    <p className='max-[400px]:hidden'>Previous</p>
                </button>
                <h2 className="text-[#EC0000] font-medium text-2xl xl:text-3xl mt-2">Part 4</h2>
                <div className="w-[80px]"></div>
            </div>
            <h3 className="text-center font-medium text-xl">Make sentences from the words:</h3>

            {currentTest >= 28 && currentTest <= 38 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-3 text-center">
                        {questions[currentTest - 28]}
                    </p>
                    <input
                        required
                        minLength={1}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center mt-4"
                        placeholder="Type your sentence here"
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