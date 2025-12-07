"use client";
import { useState, useEffect } from "react";
import * as client from "../Courses/client";
import * as enrollmentsClient from "./enrollmentsClient";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../(Kambaz)/store";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
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
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const user = currentUser as { _id: string; role: string } | null;

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Fetch courses and user enrollments
  const fetchCourses = async () => {
    try {
      const allCourses = showAllCourses
        ? await client.fetchAllCourses() // fetch ALL courses from DB
        : await client.findMyCourses(); // fetch enrolled courses

      dispatch(setCourses(allCourses));

      if (user) {
        const enrollments = await enrollmentsClient.getUserEnrollments(user._id);
        const enrolledIds = enrollments.map((e: any) => e.course);
        setEnrolledCourseIds(enrolledIds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(courses.map((c) => (c._id === course._id ? course : c)))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, showAllCourses]);

  // Toggle All Courses / My Courses
  const toggleShowAllCourses = () => setShowAllCourses(!showAllCourses);

  // Handle Enroll / Unenroll
  const handleEnrollToggle = async (courseId: string) => {
    if (!user) return;

    if (enrolledCourseIds.includes(courseId)) {
      await enrollmentsClient.unenrollFromCourse(user._id, courseId);
      setEnrolledCourseIds(enrolledCourseIds.filter((id) => id !== courseId));
    } else {
      await enrollmentsClient.enrollInCourse(user._id, courseId);
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
    }
  };

  if (!currentUser)
    return (
      <div>
        If you are seeing this page, then you have refreshed or reloaded the
        page, and your new enrollments are lost. Please go back to the signin
        page.
      </div>
    );

  // Filter courses for non-faculty users
  const visibleCourses =
    user?.role === "FACULTY"
      ? courses
      : showAllCourses
        ? courses
        : courses.filter((c) => enrolledCourseIds.includes(c._id));

  const headerText =
    user?.role === "FACULTY"
      ? `Published Courses (${visibleCourses.length})`
      : showAllCourses
        ? `All Courses (${visibleCourses.length})`
        : `My Courses (${visibleCourses.length})`;

  return (
    <div id="wd-dashboard" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>

        {user?.role !== "FACULTY" && (
          <Button variant="primary" onClick={toggleShowAllCourses}>
            {showAllCourses ? "My Courses" : "All Courses"}
          </Button>
        )}
      </div>
      <hr />

      {/* FACULTY can Add / Update / Delete */}
      {user?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse}
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
                    {user?.role === "FACULTY" ? (
                      <>
                        {/* Left: Go button */}
                        <Link href={`/Courses/${c._id}/Home`}>
                          <Button variant="primary">Go</Button>
                        </Link>

                        {/* Right: Edit / Delete with small gap */}
                        <div className="d-flex gap-1">
                          <Button
                            variant="warning"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              onDeleteCourse(c._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left: Go button */}
                        <Link href={`/Courses/${c._id}/Home`}>
                          <Button
                            variant="primary"
                            disabled={!enrolledCourseIds.includes(c._id)}
                          >
                            Go
                          </Button>
                        </Link>
                        {/* Right: Enroll / Unenroll */}
                        <Button
                          variant={enrolledCourseIds.includes(c._id) ? "danger" : "success"}
                          onClick={() => handleEnrollToggle(c._id)}
                        >
                          {enrolledCourseIds.includes(c._id) ? "Unenroll" : "Enroll"}
                        </Button>
                      </>
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
