import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch, FaCheckCircle, FaCircle, FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import "../../../styles.css";

// Inline GreenCheckmark component
function GreenCheckmark() {
  return (
    <span className="position-relative d-inline-block me-2" style={{ width: "20px", height: "20px" }}>
      <FaCircle className="text-white fs-6 position-absolute top-0 start-0" />
      <FaCheckCircle className="text-success fs-5 position-absolute top-0 start-0" />
    </span>
  );
}

// Top-level control buttons for Assignment header
function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <div
        className="d-flex justify-content-center align-items-center me-3"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "20px",
          border: "1px solid #000",
          backgroundColor: "#f5f5f5",
          fontSize: "0.875rem",
          fontWeight: "normal",
          color: "#000",
        }}
      >
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
  const assignments = [
    { id: 123, title: "A1 - ENV + HTML", start: "May 6", due: "May 13" },
    { id: 234, title: "A2 - CSS + BOOTSTRAP", start: "May 10", due: "May 17" },
    { id: 345, title: "A3 - JAVASCRIPT + REACT", start: "May 15", due: "May 22" },
  ];

  return (
    <div id="wd-assignments" className="p-3">

      {/* Search bar and buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div
          className="d-flex align-items-center"
          style={{
            maxWidth: "300px",
            border: "1px solid #ced4da",
            borderRadius: "0.375rem",
            padding: "0.5rem 0.75rem",
          }}
        >
          <FaSearch className="me-2 text-muted" />
          <FormControl
            placeholder="Search..."
            style={{ border: "none", boxShadow: "none", outline: "none", padding: 0 }}
          />
        </div>

        <div className="d-flex align-items-center">
          <Button className="me-2 d-flex align-items-center btn-secondary">
            <BsPlus className="me-1 fs-5" /> Group
          </Button>
          <Button variant="danger" className="text-white d-flex align-items-center">
            <BsPlus className="me-1 fs-5" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments-list">

        {/* Assignment Group */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>ASSIGNMENTS</span>
            </span>
            <AssignmentControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((item, idx) => (
              <ListGroupItem
                key={idx}
                className="wd-lesson p-3 ps-3"
                style={{ 
                  borderLeft: "3px solid green",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: idx === assignments.length - 1 ? "none" : "1px solid gray"
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <BsGripVertical className="me-3 fs-4 text-secondary" style={{ marginTop: "2px" }} />
                    <MdOutlineAssignment className="me-3 text-success fs-5" style={{ marginTop: "4px" }} />
                    <div>
                      {/* Title wrapped in Link with original color & no underline */}
                      <Link
                        href={`/Courses/1234/Assignments/${item.id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                        className="fw-bold mb-1 d-block"
                      >
                        {item.title}
                      </Link>
                      <div className="small text-muted">
                        <span className="text-danger">Multiple Modules</span> |{" "}
                        <span className="text-dark"><b>Not available until</b> {item.start} at 12:00am</span>
                        <br />
                        <span className="text-dark"><b>Due</b> {item.due} at 11:59pm | 100 pts</span>
                      </div>
                    </div>
                  </div>
                  <LessonControlButtons />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>

        {/* Other Items */}
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div
            className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <span className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2" />
              <span style={{ fontSize: "1rem", fontWeight: "bold" }}>Other Assignments</span>
            </span>
            <OtherControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {["Quizzes", "Exams", "Projects"].map((item, idx) => (
              <ListGroupItem
                key={idx}
                className="wd-lesson p-3 ps-3"
                style={{ 
                  borderLeft: "3px solid green",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: idx === 2 ? "none" : "1px solid gray"
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <BsGripVertical className="me-3 fs-4 text-secondary" style={{ marginTop: "2px" }} />
                    <MdOutlineAssignment className="me-3 text-success fs-5" style={{ marginTop: "4px" }} />
                    <div>
                      <div className="fw-bold" style={{ fontSize: "1rem" }}>
                        {item}
                      </div>
                    </div>
                  </div>
                  <LessonControlButtons />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>

      </ListGroup>
    </div>
  );
}
