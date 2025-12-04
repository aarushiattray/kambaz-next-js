// Quiz Editor - Emily
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col, Card, ListGroup, Nav } from "react-bootstrap";
import { BsTrash, BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuizEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.cid as string;
  const quizId = params.qid as string;

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role: string; _id: string } | null;

  const [quiz, setQuiz] = useState<any>({
    title: "",
    type: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    availableDate: "",
    dueDate: "",
    availableUntil: "",
    questions: [],
  });

  const fetchQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    if (data) {
      setQuiz({
        ...quiz,
        ...data,
        points:
          data.questions?.reduce(
            (sum: number, q: any) => sum + (q.points || 0),
            0
          ) || 0,
      });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setQuiz((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: "New Question",
      points: 1,
      choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
    };
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleChoiceChange = (
    qIndex: number,
    cIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].choices[cIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = quiz.questions.filter(
      (_: any, i: number) => i !== index
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSave = async () => {
    const totalPoints = quiz.questions.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );
    const updatedQuiz = {
      ...quiz,
      points: totalPoints,
      numberOfQuestions: quiz.questions.length,
    };
    await client.updateQuiz(quizId, updatedQuiz);
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${courseId}/Quizzes/${quizId}`);
  };

  if (!currentUser || currentUser.role !== "FACULTY") {
    return <div className="p-3">Access Denied</div>;
  }

  return (
    <div className="p-3">
      {/* Tabs: Details | Questions */}
      <Nav variant="tabs" defaultActiveKey="details" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="details">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="questions"
            onClick={() =>
              router.push(`/Courses/${courseId}/Quizzes/${quizId}/questions`)
            }
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Edit Quiz</h3>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Quiz
          </Button>
        </div>
      </div>

      {/* Quiz Title */}
      <Form.Group className="mb-4">
        <Form.Label>
          <strong>Quiz Title</strong>
        </Form.Label>
        <Form.Control
          type="text"
          value={quiz.title}
          onChange={handleTitleChange}
          placeholder="Enter quiz title"
        />
      </Form.Group>

      {/* Quiz Settings */}
      <h5 className="mb-3">Quiz Settings</h5>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Quiz Type</Form.Label>
              <Form.Select
                name="type"
                value={quiz.type}
                onChange={handleChange}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select
                name="assignmentGroup"
                value={quiz.assignmentGroup}
                onChange={handleChange}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Time Limit (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="timeLimit"
                value={quiz.timeLimit}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Multiple Attempts</Form.Label>
              <Form.Check
                type="checkbox"
                name="multipleAttempts"
                checked={quiz.multipleAttempts}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                name="howManyAttempts"
                value={quiz.howManyAttempts}
                onChange={handleChange}
                disabled={!quiz.multipleAttempts}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Shuffle Answers"
                name="shuffleAnswers"
                checked={quiz.shuffleAnswers}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show Correct Answers"
                name="showCorrectAnswers"
                checked={quiz.showCorrectAnswers}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="One Question at a Time"
                name="oneQuestionAtATime"
                checked={quiz.oneQuestionAtATime}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Webcam Required"
                name="webcamRequired"
                checked={quiz.webcamRequired}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Lock Questions After Answering"
                name="lockQuestionsAfterAnswering"
                checked={quiz.lockQuestionsAfterAnswering}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Access Code</Form.Label>
              <Form.Control
                type="text"
                name="accessCode"
                value={quiz.accessCode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Available Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="availableDate"
                value={
                  quiz.availableDate
                    ? new Date(quiz.availableDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dueDate"
                value={
                  quiz.dueDate
                    ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Until Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="availableUntil"
                value={
                  quiz.availableUntil
                    ? new Date(quiz.availableUntil).toISOString().slice(0, 16)
                    : ""
                }
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <hr className="my-4" />

      {/* Questions Section */}
    </div>
  );
}
