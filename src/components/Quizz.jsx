import React, { useState, useEffect } from "react";

function Quiz({ quizData }) {
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(null)
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (!quizCompleted) {
        handleNext();
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer, currentQuestionIndex, quizCompleted]);

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
    setTimer(10);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateResult = () => {
    let score = 0;
    quizData.map((val, index) => {
      if (val.answer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  /* We can also use reduce to calulate the score */

  //   const calculateResult = () =>
  //     quizData.reduce(
  //       (score, { answer }, index) =>
  //         score + (answer === userAnswers[index] ? 1 : 0),
  //       0
  //     );

  console.log(userAnswers);

  return (
    <div className="container mx-auto p-4">
      {showResults ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Result</h1>
          <p className="text-xl">
            Your score is {calculateResult()} out of {quizData.length}
          </p>
          <button
            className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {quizData[currentQuestionIndex].question}
          </h2>
          <ul>
            {quizData[currentQuestionIndex].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswer(option)}
                className="mb-2"
              >
                <input
                  type="checkbox"
                  onChange={() => handleAnswer(option)}
                  checked={userAnswers[currentQuestionIndex] === option}
                  className="mr-2"
                />
                <label htmlFor="" className="select-none">
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`mr-2 ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={userAnswers[currentQuestionIndex] === null}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                userAnswers[currentQuestionIndex] === null
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
            <div>Time left: {timer} sec</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
