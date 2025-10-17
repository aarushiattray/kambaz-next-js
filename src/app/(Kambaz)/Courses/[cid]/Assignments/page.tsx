"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch, FaCheckCircle, FaCircle, FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import assignmentsData from "../../../Database/assignments.json";
import "../../../styles.css";

// Inline GreenCheckmark component
function GreenCheckmark() {
  return (
    <span
      className="position-relative d-inline-block me-2"
      style={{ width: "20px", height: "20px" }}
    >
      <FaCircle className="text-white fs-6 position-absolute top-0 start-0" />
      <FaCheckCircle className="text-success fs-5 position-absolute top-0 start-0" />
    </span>
  );
}

// Top-level control buttons for Assignment header
function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex justify-content-center align-items-center me-3 px-3 py-2 rounded-pill border bg-light text-dark small">
        40% of Total
      </div>
      <BsPlus className="fs-4 me-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

// Control buttons for other sections
function OtherControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <BsPlus className="fs-4 me-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

// Buttons for individual lessons/assignments
function LessonControlButtons() {
  return (
    <div className="d-flex align-items-center float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

export default function Assignments() {
  const params = useParams();
  const courseId = params.cid; // Use the course ID from URL

  // Filter assignments by the course
  const assignments = assignmentsData.filter((a) => a.course === courseId);

  return (
    <div id="wd-assignments" className="p-3">
      {/* Search bar and buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div
          className="d-flex align-items-center border rounded px-3 py-2 me-3"
          style={{ maxWidth: "300px" }}
        >
          <FaSearch className="me-2 text-muted" />
          <FormControl
            placeholder="Search..."
            className="border-0 shadow-none p-0"
          />
        </div>

        <div className="d-flex align-items-center">
          <Button className="me-2 d-flex align-items-center btn-secondary">
            <BsPlus className="me-1 fs-5" /> Group
          </Button>
          <Button
            variant="danger"
            className="text-white d-flex align-items-center"
          >
            <BsPlus className="me-1 fs-5" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments-list">
        {/* Assignment Group */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center px-3 py-3 rounded bg-light border-bottom border-dark">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span className="fw-bold fs-6">ASSIGNMENTS</span>
            </span>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0 mt-0">
            {assignments.map((item, idx) => (
              <ListGroupItem
                key={idx}
                className="wd-lesson d-flex justify-content-between align-items-start px-3 py-3"
                style={{ borderLeft: "3px solid green" }}
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-3 fs-4 text-secondary mt-1" />
                  <MdOutlineAssignment className="me-3 text-success fs-5 mt-1" />
                  <div>
                    <Link
                      href={`/Courses/${courseId}/Assignments/${item._id}`}
                      className="fw-bold mb-1 d-block text-decoration-none text-dark"
                    >
                      {item.title}
                    </Link>
                    <div className="small text-muted">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <span className="text-dark">
                        <b>Not available until</b> {item.availableDate} at 12:00am
                      </span>
                      <br />
                      <span className="text-dark">
                        <b>Due</b> {item.dueDate} at 11:59pm | {item.points} pts
                      </span>
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>

        {/* Other Items */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center px-3 py-3 rounded bg-light border-top border-bottom border-dark">
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span className="fw-bold fs-6">Other Assignments</span>
            </span>
            <OtherControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0 mt-0">
            {["Quizzes", "Exams", "Projects"].map((item, idx) => (
              <ListGroupItem
                key={idx}
                className="wd-lesson d-flex justify-content-between align-items-start px-3 py-3"
                style={{ borderLeft: "3px solid green" }}
              >
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-3 fs-4 text-secondary mt-1" />
                  <MdOutlineAssignment className="me-3 text-success fs-5 mt-1" />
                  <div>
                    <div className="fw-bold fs-6">{item}</div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
