import React from "react";
import "./App.css";
import Quizz from "./components/Quizz";
import { quizData } from "./components/QuizData";

function App() {
  return (
    <div className="App">
      <Quizz quizData={quizData} />
    </div>
  );
}

export default App;
