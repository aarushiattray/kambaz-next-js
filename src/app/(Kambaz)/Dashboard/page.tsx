"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import {
  enrollCourse,
  unenrollCourse,
  selectUserEnrollments,
} from "./enrollmentsReducer";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const userEnrollments = useSelector((state: any) =>
    currentUser ? selectUserEnrollments(state, currentUser._id) : []
  );

  const dispatch = useDispatch();

  // Local course state only for editing form
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [enrolling, setEnrolling] = useState(false); // false: My Courses, true: All Courses
  const toggleEnrolling = () => setEnrolling(!enrolling);

  const isEnrolled = (courseId: string) =>
    userEnrollments.some((e: any) => e.course === courseId);

  const handleEnrollToggle = (courseId: string) => {
    if (!currentUser) return;
    if (isEnrolled(courseId)) {
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    }
  };

  // If currentUser not loaded yet, show that yuser has refreshed and enrollements are lost 
  if (!currentUser) return <div>If you are seeing this page, then you have refreshed or reloaded the page, and your new enrollments are lost. Please locate back to the signin page.</div>;

  // Filter courses depending on role and enrolling toggle
  const visibleCourses = courses.filter((c: any) => {
    if (currentUser.role === "FACULTY") return true;
    if (enrolling) return true;
    return isEnrolled(c._id);
  });

  // Determine header text
  const headerText =
    currentUser.role === "FACULTY"
      ? `Published Courses (${visibleCourses.length})`
      : enrolling
      ? `All Courses (${visibleCourses.length})`
      : `My Courses (${visibleCourses.length})`;

  return (
    <div id="wd-dashboard" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser.role !== "FACULTY" && (
          <Button variant="primary" onClick={toggleEnrolling}>
            {enrolling ? "My Courses" : "All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {/* Only FACULTY can Add / Update / Delete */}
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">{headerText}</h2>
      <hr />

      {/* Courses Grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardImg
                  src={c.image || "/images/reactjs.jpg"}
                  variant="top"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    <strong>{c.name}</strong>
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {c.description}
                  </CardText>

                  <div className="d-flex align-items-center justify-content-between">
                    {/* Navigate only if enrolled or FACULTY */}
                    <Link
                      href={
                        currentUser.role === "FACULTY" || isEnrolled(c._id)
                          ? `/Courses/${c._id}/Home`
                          : "#"
                      }
                      onClick={(e) => {
                        if (!isEnrolled(c._id) && currentUser.role !== "FACULTY") {
                          e.preventDefault();
                          alert("You are not enrolled in this course.");
                        }
                      }}
                    >
                      <Button variant="primary">Go</Button>
                    </Link>

                    {currentUser.role === "FACULTY" ? (
                      <div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteCourse(c._id));
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <Button
                        variant={isEnrolled(c._id) ? "danger" : "success"}
                        onClick={() => handleEnrollToggle(c._id)}
                      >
                        {isEnrolled(c._id) ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}