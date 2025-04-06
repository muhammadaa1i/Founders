import React, { useState, useEffect } from 'react';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';

const Kids = () => {
  const [activePart, setActivePart] = useState(() => {
    const savedPart = localStorage.getItem('activePart');
    return savedPart || 'part1';
  });

  const [activeQuestion, setActiveQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem('activeQuestion');
    return savedQuestion ? Number(savedQuestion) : 1;
  });

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : {
      part1: Array(6).fill(''),
      part2: Array(6).fill(''),
      part3: Array(15).fill(''),
      part4: Array(11).fill('') // 11 questions (28-38)
    };
  });

  useEffect(() => {
    localStorage.setItem('activePart', activePart);
    localStorage.setItem('activeQuestion', activeQuestion);
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [activePart, activeQuestion, answers]);

  const handlePartComplete = (nextPart) => {
    let nextQuestion = 1;
    if (nextPart === 'part2') nextQuestion = 7;
    else if (nextPart === 'part3') nextQuestion = 13;
    else if (nextPart === 'part4') nextQuestion = 28;
    
    setActivePart(nextPart);
    setActiveQuestion(nextQuestion);
  };

  const handleGoToPreviousPart = (targetPart, targetQuestion) => {
    if (targetPart && targetQuestion) {
      setActivePart(targetPart);
      setActiveQuestion(targetQuestion);
      
      if (targetPart === 'part3') {
        localStorage.setItem('part3CurrentTest', targetQuestion);
      }
    } else {
      if (activePart === 'part2') {
        setActivePart('part1');
        setActiveQuestion(6);
      } else if (activePart === 'part3') {
        setActivePart('part2');
        setActiveQuestion(12);
      } else if (activePart === 'part1') {
        setActivePart('part3');
        setActiveQuestion(27);
        localStorage.setItem('part3CurrentTest', 27);
      } else if (activePart === 'part4') {
        setActivePart('part3');
        setActiveQuestion(27);
      }
    }
  };

  const updateAnswers = (part, questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [part]: prev[part].map((item, index) => 
        index === questionIndex ? answer : item
      )
    }));
  };

  return (
    <div className="kids-main pt-28 pb-12">
      <div
        className="kids m-auto w-[90%] min-[400px]:w-[80%] md:w-[70%] xl:w-[60%] h-auto rounded-2xl px-2 border-2 text-center border-[#EC0000]"
        style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}
      >
        <h1 className="font-monserat font-medium text-4xl lg:text-5xl mt-[10px]">Questions:</h1>
        {activePart === 'part1' && (
          <Part1
            onComplete={() => handlePartComplete('part2')}
            onPrevious={handleGoToPreviousPart}
            currentQuestion={activeQuestion}
            setCurrentQuestion={setActiveQuestion}
            answers={answers.part1}
            updateAnswers={(index, answer) => updateAnswers('part1', index, answer)}
          />
        )}
        {activePart === 'part2' && (
          <Part2
            onComplete={() => handlePartComplete('part3')}
            onPrevious={handleGoToPreviousPart}
            currentQuestion={activeQuestion}
            setCurrentQuestion={setActiveQuestion}
            answers={answers.part2}
            updateAnswers={(index, answer) => updateAnswers('part2', index, answer)}
          />
        )}
        {activePart === 'part3' && (
          <Part3
            onComplete={() => handlePartComplete('part4')}
            onPrevious={handleGoToPreviousPart}
            currentQuestion={activeQuestion}
            setCurrentQuestion={setActiveQuestion}
            answers={answers.part3}
            updateAnswers={(index, answer) => updateAnswers('part3', index, answer)}
          />
        )}
        {activePart === 'part4' && (
          <Part4
            onComplete={() => handlePartComplete('complete')} // Or next part if exists
            onPrevious={handleGoToPreviousPart}
            currentQuestion={activeQuestion}
            setCurrentQuestion={setActiveQuestion}
            answers={answers.part4}
            updateAnswers={(index, answer) => updateAnswers('part4', index, answer)}
          />
        )}
      </div>
    </div>
  );
};

export default Kids;