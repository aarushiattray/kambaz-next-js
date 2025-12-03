// Quiz Preview - Emily
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    points: 0,
    questions: [],
    timeLimit: 20,
  });

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const fetchQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    if (data) {
      setQuiz(data);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const handleBack = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  if (!currentUser) return null;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>{quiz.title} - Preview</h3>
          <p className="text-muted mb-0">
            <strong>Total Points:</strong> {quiz.points} | <strong>Questions:</strong>{" "}
            {quiz.questions.length} | <strong>Time Limit:</strong> {quiz.timeLimit} minutes
          </p>
        </div>
        <Button variant="secondary" onClick={handleBack}>
          Back to Details
        </Button>
      </div>

      {quiz.description && (
        <Card className="mb-4">
          <Card.Body>
            <p className="mb-0">{quiz.description}</p>
          </Card.Body>
        </Card>
      )}

      {quiz.questions.length === 0 && (
        <Card className="text-center p-4">
          <Card.Body>
            <p className="text-muted">This quiz has no questions yet.</p>
          </Card.Body>
        </Card>
      )}

      {quiz.questions.map((question: any, qIndex: number) => (
        <Card key={qIndex} className="mb-4">
          <Card.Header>
            <strong>Question {qIndex + 1}</strong>
            <span className="float-end text-muted">{question.points} pts</span>
          </Card.Header>
          <Card.Body>
            <p className="mb-3">{question.questionText}</p>

            <Form>
              {question.choices.map((choice: string, cIndex: number) => (
                <Form.Check
                  key={cIndex}
                  type="radio"
                  name={`question-${qIndex}`}
                  id={`q${qIndex}-choice${cIndex}`}
                  label={choice}
                  value={choice}
                  checked={selectedAnswers[qIndex] === choice}
                  onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                  className="mb-2"
                />
              ))}
            </Form>

            {/* Show correct answer only for faculty in preview */}
            {currentUser.role === "FACULTY" && (
              <div className="mt-3 p-2 bg-light border rounded">
                <small className="text-success">
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </small>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      <div className="text-center mt-4">
        <Button variant="primary" size="lg" disabled>
          Submit Quiz (Preview Only)
        </Button>
      </div>
    </div>
  );
}