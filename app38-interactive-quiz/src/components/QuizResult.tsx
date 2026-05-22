import {
  Badge,
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

import { Button } from "@fluentui/react-components";

export function QuizResult({
  score,
  totalQuestions,
  onRestart,
}: QuizResultProps) {
  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  return (
    <Card
      style={{
        padding: "40px",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center",
      }}
    >
      <Title1>Quiz Completed</Title1>

      <div
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <Badge appearance="filled" size="extra-large">
          {score} / {totalQuestions}
        </Badge>
      </div>

      <Text
        size={500}
        weight="semibold"
      >
        Final Score: {percentage}%
      </Text>

      <div
        style={{
          marginTop: "32px",
        }}
      >
        <Button
          appearance="primary"
          onClick={onRestart}
        >
          Restart Quiz
        </Button>
      </div>
    </Card>
  );
}