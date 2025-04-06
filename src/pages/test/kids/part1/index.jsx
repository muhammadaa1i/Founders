import React, { useState, useEffect } from 'react';
import kids1 from '../../../../assets/kids1.png';
import kids2 from '../../../../assets/kids2.png';
import kids3 from '../../../../assets/kids3.png';
import kids4 from '../../../../assets/kids4.png';
import kids5 from '../../../../assets/kids5.png';
import kids6 from '../../../../assets/kids6.png';

const Part1 = ({ onComplete, onPrevious, currentQuestion, setCurrentQuestion }) => {
    const [currentTest, setCurrentTest] = useState(currentQuestion || 1);
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');

    // Load answers from localStorage when the component mounts
    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('part1Answers')) || [];
        setAnswers(savedAnswers);

        if (savedAnswers[currentTest - 1]) {
            setAnswer(savedAnswers[currentTest - 1]);
        }
    }, [currentTest]);

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
            const updatedAnswers = [...answers];
            updatedAnswers[currentTest - 1] = answer;
            setAnswers(updatedAnswers);

            // Save answers to localStorage
            localStorage.setItem('part1Answers', JSON.stringify(updatedAnswers));

            if (currentTest < 6) {
                setCurrentTest(currentTest + 1);
                setAnswer(''); // Clear the input for the next question
                setError('');
            } else {
                onComplete(); // Move to the next part
            }
        } else if (answer.trim() === '') {
            setError('Answer cannot be empty!');
        }
    };

    const handlePrevious = () => {
        if (currentTest > 1) {
            setCurrentTest(currentTest - 1);
            setCurrentQuestion(currentTest - 1);
            setAnswer(answers[currentTest - 2] || '');
            setError('');
        } else if (currentTest === 1) {
            onPrevious('part3', 27);
        }
    };

    const renderTestItem = (testNumber, image, altText) => (
        <div className="test-item mt-10 mb-16 w-[270px] m-auto">
            <p className="text-2xl font-medium text-start ml-6 sm:ml-0">{testNumber}.</p>
            <img
                loading="lazy"
                src={image}
                alt={altText}
                className="m-auto w-[200px] h-[140px] min-[450px]:h-[160px] sm:h-[200px] min-[450px]:w-[220px] sm:w-full object-contain"
            />
            <input
                required
                minLength={3}
                maxLength={12}
                type="text"
                value={answer}
                onChange={handleInputChange}
                className="w-[80%] sm:w-full m-auto border-b-2 border-black outline-none text-3xl text-center"
            />
            {error && <p className="text-red-600 text-lg mt-2">{error}</p>}
        </div>
    );

    return (
        <>
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentTest === 1}
                    className={`text-xl flex flex-row border-2 p-1 items-center gap-2 font-medium rounded-lg outline-none mt-[-20px] ml-1 ${currentTest === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                    <i className="fa-solid fa-chevron-left text-xl mt-1"></i>
                    <p className="max-[400px]:hidden">Previous</p>
                </button>
                <h2 className="text-[#EC0000] max-[400px]:ml-12 font-medium text-2xl xl:text-3xl mt-2">Part 1</h2>
                <div className="w-[80px]"></div>
            </div>

            {currentTest === 1 && renderTestItem(1, kids1, 'Car')}
            {currentTest === 2 && renderTestItem(2, kids2, 'Swimmer')}
            {currentTest === 3 && renderTestItem(3, kids3, 'Third Test Image')}
            {currentTest === 4 && renderTestItem(4, kids4, 'Fourth Test Image')}
            {currentTest === 5 && renderTestItem(5, kids5, 'Fifth Test Image')}
            {currentTest === 6 && renderTestItem(6, kids6, 'Sixth Test Image')}

            {currentTest <= 6 && (
                <div className="mb-[30px] mt-[-50px]">
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

export default Part1;