"use client";

import { useState, useEffect } from "react";
import * as client from "../Courses/client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../(Kambaz)/store";
import { setCourses } from "../Courses/reducer";
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

type User = {
  _id: string;
  role: string;
};

type Course = {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
};

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const user = currentUser as User | null;

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Fetch all courses and current user's enrollments
  const fetchCoursesAndEnrollments = async () => {
    try {
      if (!user) return;

      // Fetch all courses
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));

      // Fetch enrolled courses for current user (both students AND faculty)
      const myCourses = await client.findMyCourses();
      setEnrolledCourses(myCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    if (!course.name) return;
    await client.createCourse(course);
    fetchCoursesAndEnrollments(); 
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id && c._id !== courseId)));
    setEnrolledCourses(enrolledCourses.filter((c) => c._id !== courseId));
  };

  const onUpdateCourse = async () => {
    if (!course._id) return;
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
  };

  const handleEnrollToggle = async (courseId: string) => {
    if (!user) return;
    const isEnrolled = enrolledCourses.some((c) => c._id === courseId);
    
    if (isEnrolled) {
      await client.unenrollFromCourse(user._id, courseId);
      setEnrolledCourses(enrolledCourses.filter((c) => c._id !== courseId));
    } else {
      await client.enrollIntoCourse(user._id, courseId);
      const enrolledCourse = courses.find((c) => c._id === courseId);
      if (enrolledCourse) {
        setEnrolledCourses([...enrolledCourses, enrolledCourse]);
      }
    }
  };

  const toggleShowAllCourses = () => setShowAllCourses(!showAllCourses);

  useEffect(() => {
    fetchCoursesAndEnrollments();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        If you are seeing this page, then you have refreshed or reloaded the page, and
        your new enrollments are lost. Please go back to the signin page.
      </div>
    );
  }

  // Get enrolled course IDs
  const enrolledCourseIds = enrolledCourses.map((c) => c._id);

  // Filter visible courses (both faculty and students use same logic)
  const visibleCourses = courses
    .filter((c): c is Course => c != null && c._id != null)
    .filter((c) => {
      if (showAllCourses) return true;
      return enrolledCourseIds.includes(c._id);
    });

  const headerText = showAllCourses
    ? `All Courses (${visibleCourses.length})`
    : `My Courses (${visibleCourses.length})`;

  return (
    <div id="wd-dashboard" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button variant="primary" onClick={toggleShowAllCourses}>
          {showAllCourses ? "My Courses" : "All Courses"}
        </Button>
      </div>
      <hr />
      {user?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end" onClick={onAddNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2" onClick={onUpdateCourse}>
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
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">{headerText}</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c) => (
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
                    {c.description || ""}
                  </CardText>
                  <div className="d-flex align-items-center justify-content-between">
                    {user?.role === "FACULTY" ? (
                      <>
                        <Link href={`/Courses/${c._id}/Home`}>
                          <Button
                            variant="primary"
                            disabled={!enrolledCourseIds.includes(c._id)}
                          >
                            Go
                          </Button>
                        </Link>
                        <div className="d-flex gap-1">
                          <Button variant="warning" onClick={() => setCourse(c)}>
                            Edit
                          </Button>
                          <Button variant="danger" onClick={() => onDeleteCourse(c._id)}>
                            Delete
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href={`/Courses/${c._id}/Home`}>
                          <Button
                            variant="primary"
                            disabled={!enrolledCourseIds.includes(c._id)}
                          >
                            Go
                          </Button>
                        </Link>
                        {showAllCourses && (
                          <Button
                            variant={enrolledCourseIds.includes(c._id) ? "danger" : "success"}
                            onClick={() => handleEnrollToggle(c._id)}
                          >
                            {enrolledCourseIds.includes(c._id) ? "Unenroll" : "Enroll"}
                          </Button>
                        )}
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