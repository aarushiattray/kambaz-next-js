"use client";

import Link from "next/link";
import { Card, CardBody, CardTitle, CardText, CardImg, Button, Row, Col } from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
  const courses = db.courses;

  return (
    <div id="wd-dashboard" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      {/* Dashboard Title */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Published Courses */}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      {/* Courses Grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg" // you can replace images later
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
