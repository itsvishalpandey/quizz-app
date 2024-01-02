import React from "react";
import Quizz from "./components/Quizz";
import { quizData } from "./components/QuizData";

function App() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <Quizz quizData={quizData} />
    </div>
  );
}

export default App;
