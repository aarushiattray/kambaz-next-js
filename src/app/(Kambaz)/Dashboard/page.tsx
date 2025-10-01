"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import { BsClipboard } from "react-icons/bs"; // assignments-like icon

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ paddingLeft: "30px", paddingRight: "30px" }}>
      {/* Dashboard Title */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Published Courses */}
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div
        id="wd-dashboard-courses"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px", // horizontal and vertical spacing
          justifyContent: "flex-start",
        }}
      >
        {/* Course 1 */}
        <Card style={{ width: "260px", position: "relative" }}>
          {/* Top-right gray dots */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/1234/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS1234 12847 React JS SEC 101 BOS [XCR-1-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/1234/Home" className="text-secondary text-decoration-none">
                12847.101
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 101 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/1234/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 2 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/python.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/5678/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS5678 23456 Python Basics SEC 102 BOS [XCR-2-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/5678/Home" className="text-secondary text-decoration-none">
                23456.102
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 102 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/5678/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 3 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/javascript.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/9101/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS9101 34567 JavaScript SEC 103 BOS [XCR-3-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/9101/Home" className="text-secondary text-decoration-none">
                34567.103
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 103 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/9101/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 4 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/htmlcss.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/1121/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS1121 45678 HTML & CSS SEC 104 BOS [XCR-4-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/1121/Home" className="text-secondary text-decoration-none">
                45678.104
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 104 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/1121/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 5 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/java.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/3141/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS3141 56789 Java SEC 105 BOS [XCR-5-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/3141/Home" className="text-secondary text-decoration-none">
                56789.105
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 105 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/3141/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 6 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/sql.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/5161/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS5161 67890 SQL SEC 106 BOS [XCR-6-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/5161/Home" className="text-secondary text-decoration-none">
                67890.106
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 106 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/5161/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

        {/* Course 7 */}
        <Card style={{ width: "260px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
            <span style={{ width: "4px", height: "4px", backgroundColor: "#ccc", borderRadius: "50%" }} />
          </div>

          <CardImg variant="top" src="/images/machinelearning.jpg" width="100%" height={160} />
          <CardBody>
            <Link href="/Courses/7181/Home" className="text-primary text-decoration-none">
              <CardTitle className="wd-dashboard-course-title text-primary">
                CS7181 78901 Machine Learning SEC 107 BOS [XCR-7-CO]
              </CardTitle>
            </Link>
            <CardText>
              <Link href="/Courses/7181/Home" className="text-secondary text-decoration-none">
                78901.107
              </Link>
            </CardText>
            <CardText className="text-secondary">
              SEC 107 Fall 2025 Semester Full Term
            </CardText>
            <Link href="/Courses/7181/Home" className="text-decoration-none">
              <BsClipboard size={24} color="#0d6efd" />
            </Link>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}
