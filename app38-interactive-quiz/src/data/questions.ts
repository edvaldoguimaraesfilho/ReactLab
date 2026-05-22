import type { QuizQuestion } from "../models/QuizQuestion";

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is React primarily used for?",
    options: [
      "Database management",
      "Building user interfaces",
      "Operating systems",
      "Network security",
    ],
    correctAnswer: "Building user interfaces",
  },
  {
    id: 2,
    question: "Which hook is used for component memory?",
    options: [
      "useEffect",
      "useContext",
      "useState",
      "useMemo",
    ],
    correctAnswer: "useState",
  },
  {
    id: 3,
    question: "Which company created Fluent UI?",
    options: [
      "Google",
      "Amazon",
      "Microsoft",
      "Meta",
    ],
    correctAnswer: "Microsoft",
  },
  {
    id: 4,
    question: "What does JSX represent?",
    options: [
      "A database",
      "A CSS engine",
      "A JavaScript syntax extension",
      "A package manager",
    ],
    correctAnswer: "A JavaScript syntax extension",
  },
];