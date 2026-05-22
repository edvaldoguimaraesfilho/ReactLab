import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { QuizCard } from "./components/QuizCard";
import { QuizResult } from "./components/QuizResult";

import { questions } from "./data/questions";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [isQuizFinished, setIsQuizFinished] =
    useState(false);

  const currentQuestion =
    questions[currentQuestionIndex];

  function handleNextQuestion() {
    const isCorrect =
      selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }

    const isLastQuestion =
      currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setIsQuizFinished(true);
      return;
    }

    setCurrentQuestionIndex(
      (previousIndex) => previousIndex + 1
    );

    setSelectedAnswer("");
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setIsQuizFinished(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Title1>Interactive Quiz</Title1>

        <Text>
          A React quiz application using Fluent UI,
          TypeScript, and dynamic state management.
        </Text>

        <div
          style={{
            marginTop: "32px",
          }}
        >
          {isQuizFinished ? (
            <QuizResult
              score={score}
              totalQuestions={questions.length}
              onRestart={handleRestartQuiz}
            />
          ) : (
            <QuizCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={setSelectedAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={
                currentQuestionIndex ===
                questions.length - 1
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;