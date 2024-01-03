import React, { useState, useEffect } from "react";

function Quiz({ quizData }) {
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(null)
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(10);

  const [completedQuestion, setCompletedQuestion] = useState(0);
  const [remainingQuestion, setRemainingQuestion] = useState(quizData.length);

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
      setCompletedQuestion((prev) => prev + 1);
      setRemainingQuestion((prev) => prev - 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
      setCompletedQuestion((prev) => prev + 1);
      setRemainingQuestion((prev) => prev - 1);
    }
    setTimer(10);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setCompletedQuestion((prev) => prev - 1);
      setRemainingQuestion((prev) => prev + 1);
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
    <div className=" w-4/6 py-6 px-8 shadow-2xl">
      {showResults ? (
        <div className="text-center py-6">
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
          <div>
            <progress
              className="w-full"
              id="progress-bar"
              max={quizData.length}
              value={currentQuestionIndex}
            />
          </div>
          <div className="flex justify-between mt-4 mb-8">
            <p className="font-bold text-gray-500 text-xl">
              Completed: {completedQuestion}
            </p>
            <p className="font-bold text-gray-500 text-xl">
              Remaining: {remainingQuestion}
            </p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {quizData[currentQuestionIndex].question}
          </h2>
          <ul className="font-semibold">
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
          <div className="flex justify-between mt-6">
            <div>
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className={`mr-2 ${
                  currentQuestionIndex === 0
                    ? "opacity-50 bg-gray-400 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-gray-500"
                } text-white font-bold py-2 px-8 rounded`}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                disabled={userAnswers[currentQuestionIndex] === null}
                className={`bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-8 rounded ${
                  userAnswers[currentQuestionIndex] === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
            <div>
              <div className="font-bold text-xl">Time left: {timer} sec</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
