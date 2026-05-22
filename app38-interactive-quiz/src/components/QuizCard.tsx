import {
  Button,
  Card,
  Radio,
  RadioGroup,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { QuizQuestion } from "../models/QuizQuestion";

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  isLastQuestion,
}: QuizCardProps) {
  return (
    <Card
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <Title2>{question.question}</Title2>

      <RadioGroup
        value={selectedAnswer}
        onChange={(_, data) => onSelectAnswer(data.value)}
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {question.options.map((option) => (
          <Radio
            key={option}
            value={option}
            label={option}
          />
        ))}
      </RadioGroup>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>
          Selected Answer:
          {" "}
          {selectedAnswer || "None"}
        </Text>

        <Button
          appearance="primary"
          disabled={!selectedAnswer}
          onClick={onNextQuestion}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </Card>
  );
}