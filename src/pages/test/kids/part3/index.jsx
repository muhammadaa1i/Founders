import React, { useEffect, useState } from 'react';

const Part3 = ({ onComplete, onPrevious, currentQuestion, setCurrentQuestion, answers, updateAnswers }) => {
    const [currentTest, setCurrentTest] = useState(currentQuestion || 13);
    const [answer, setAnswer] = useState(''); // Stores the user's answer
    const [error, setError] = useState(''); // Tracks error messages for invalid input

    const infoText = `
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

    useEffect(() => {
        setAnswer(answers[currentTest - 13] || '');
    }, [currentTest, answers]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s']*$/.test(value)) { // Restricts input to letters, spaces, and single quotes
            setAnswer(value);
            setError(''); // Clear error if input is valid
        } else {
            setError('Only letters are allowed!');
        }
    };

    const handleSubmit = () => {
        if (answer.trim() !== '' && /^[a-zA-Z\s']+$/.test(answer)) {
            updateAnswers(currentTest - 13, answer); // Save the answer to parent state
            if (currentTest < 27) {
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
        if (answer.trim() !== '') {
            updateAnswers(currentTest - 13, answer); // Save current answer before navigating
        }
        if (currentTest > 13) {
            setCurrentTest(currentTest - 1);
            setCurrentQuestion(currentTest - 1);
            setAnswer(answers[currentTest - 14] || '');
            setError('');
        } else if (currentTest === 13) {
            onPrevious('part2', 12); // Navigate back to Part 2, question 12
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
                <h2 className="text-[#EC0000] font-medium text-2xl xl:text-3xl mt-2">Part 3</h2>
                <div className="w-[80px]"></div> {/* Spacer for alignment */}
            </div>
            <h3 className="text-center font-medium text-xl">Read the text, answer the questions:</h3>

            {/* Informational Text */}
            <div className="info-text w-[90%] md:w-[80%] m-auto mt-6 mb-10 text-lg text-start font-normal">
                <p>{infoText.trim()}</p>
            </div>

            {/* Test 13 */}
            {currentTest === 13 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-3 text-center">{questions[0]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 14 */}
            {currentTest === 14 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-3 text-center">{questions[1]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 15 */}
            {currentTest === 15 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-4 text-center">{questions[2]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 16 */}
            {currentTest === 16 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-7 text-center">{questions[3]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 17 */}
            {currentTest === 17 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-[18px] text-center">{questions[4]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 18 */}
            {currentTest === 18 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-4 text-center">{questions[5]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 19 */}
            {currentTest === 19 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-6 text-center">{questions[6]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 20 */}
            {currentTest === 20 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-4 text-center">{questions[7]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 21 */}
            {currentTest === 21 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-7 text-center">{questions[8]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 22 */}
            {currentTest === 22 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-5 text-center">{questions[9]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 23 */}
            {currentTest === 23 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-9 text-center">{questions[10]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 24 */}
            {currentTest === 24 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-6 text-center">{questions[11]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 25 */}
            {currentTest === 25 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-5 text-center">{questions[12]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 26 */}
            {currentTest === 26 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-8 text-center">{questions[13]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Test 27 */}
            {currentTest === 27 && (
                <div className="test-item mt-8 mb-16 w-[270px] m-auto">
                    <p className="text-2xl font-medium text-start">{currentTest}.</p>
                    <p className="text-2xl font-medium mt-[-32px] ml-8 text-center">{questions[14]}</p>
                    <input
                        required
                        minLength={1}
                        maxLength={20}
                        type="text"
                        value={answer}
                        onChange={handleInputChange}
                        className="w-[70%] m-auto border-b-2 border-black outline-none text-2xl font-normal text-center"
                    />
                    {error && (
                        <p className="text-red-600 text-lg mt-2">{error}</p>
                    )}
                </div>
            )}

            {/* Submit Button */}
            {currentTest <= 27 && (
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

export default Part3;