import React from "react";
import Quizz from "./components/Quizz";
import { quizData } from "./components/QuizData";

function App() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div>
          <h1 className="mb-12 text-3xl font-bold">Quizz App</h1>
        </div>
        <Quizz quizData={quizData} />
      </div>
    </>
  );
}

export default App;
