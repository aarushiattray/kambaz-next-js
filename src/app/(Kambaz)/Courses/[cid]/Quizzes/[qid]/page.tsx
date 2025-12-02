// Quiz Details - Emily 
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";

export default function QuizDetails() {
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

  // Fetch quiz details
  const fetchQuiz = async () => {
    if (!quizId) return;
    const data = await client.findQuizById(quizId);
    if (data) {
      setQuiz({
        ...quiz,
        ...data,
        points:
          data.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || 0,
      });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setQuiz((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSave = async () => {
    await client.updateQuiz(quizId, quiz);
    router.push(`/Courses/${courseId}/Quizzes`);
  };

  if (!currentUser) return null;

  // STUDENT VIEW
  if (currentUser.role === "STUDENT") {
    return (<div className="p-3"> <h3>{quiz.title}</h3> <p>Points: {quiz.points}</p> <p>
      Available: {quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "N/A"}{" "}
      until {quiz.availableUntil ? new Date(quiz.availableUntil).toLocaleString() : "N/A"} </p>
      <Button
        onClick={() => router.push(`/Courses/${courseId}/Quizzes/${quizId}/start`)}
        disabled={!(quiz.published && (!quiz.availableDate || new Date() >= new Date(quiz.availableDate)))}
      >
        Start Quiz </Button> </div>
    );
  }

  // FACULTY VIEW
  return (<div className="p-3"> <h3>{quiz.title}</h3> <Form> <Row className="mb-3"> <Col md={6}>
    <Form.Group>
      <Form.Label>Quiz Type</Form.Label>
      <Form.Select name="type" value={quiz.type} onChange={handleChange}> <option>Graded Quiz</option> <option>Practice Quiz</option> <option>Graded Survey</option> <option>Ungraded Survey</option>
      </Form.Select>
    </Form.Group> </Col> <Col md={6}>
      <Form.Group>
        <Form.Label>Points</Form.Label>
        <Form.Control type="number" value={quiz.points} readOnly />
      </Form.Group> </Col> </Row>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select name="assignmentGroup" value={quiz.assignmentGroup} onChange={handleChange}>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Shuffle Answers</Form.Label>
          <Form.Check type="checkbox" name="shuffleAnswers" checked={quiz.shuffleAnswers} onChange={handleChange} />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group>
          <Form.Label>Time Limit (minutes)</Form.Label>
          <Form.Control type="number" name="timeLimit" value={quiz.timeLimit} onChange={handleChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Multiple Attempts</Form.Label>
          <Form.Check type="checkbox" name="multipleAttempts" checked={quiz.multipleAttempts} onChange={handleChange} />
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
          <Form.Check type="checkbox" label="Show Correct Answers" name="showCorrectAnswers" checked={quiz.showCorrectAnswers} onChange={handleChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Access Code</Form.Label>
          <Form.Control type="text" name="accessCode" value={quiz.accessCode} onChange={handleChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Check type="checkbox" label="One Question at a Time" name="oneQuestionAtATime" checked={quiz.oneQuestionAtATime} onChange={handleChange} />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3">
      <Col md={4}>
        <Form.Group>
          <Form.Check type="checkbox" label="Webcam Required" name="webcamRequired" checked={quiz.webcamRequired} onChange={handleChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Check type="checkbox" label="Lock Questions After Answering" name="lockQuestionsAfterAnswering" checked={quiz.lockQuestionsAfterAnswering} onChange={handleChange} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Available Date</Form.Label>
          <Form.Control type="datetime-local" name="availableDate" value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""} onChange={handleChange} />
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="datetime-local" name="dueDate" value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""} onChange={handleChange} />
          <Form.Label>Until Date</Form.Label>
          <Form.Control type="datetime-local" name="availableUntil" value={quiz.availableUntil ? new Date(quiz.availableUntil).toISOString().slice(0, 16) : ""} onChange={handleChange} />
        </Form.Group>
      </Col>
    </Row>

    <Button variant="primary" onClick={handleSave}>
      Save Quiz
    </Button>
  </Form>
  </div>

  );
}
