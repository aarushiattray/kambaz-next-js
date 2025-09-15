import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/python.jpg" width={200} height={150} alt="Python" />
            <div>
              <h5>CS5678 Python Basics</h5>
              <p className="wd-dashboard-course-title">
                Learn Python from Scratch
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/9101" className="wd-dashboard-course-link">
            <Image src="/images/javascript.jpg" width={200} height={150} alt="JavaScript" />
            <div>
              <h5>CS9101 JavaScript</h5>
              <p className="wd-dashboard-course-title">
                Dynamic Web Programming
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1121" className="wd-dashboard-course-link">
            <Image src="/images/htmlcss.jpg" width={200} height={150} alt="HTML CSS" />
            <div>
              <h5>CS1121 HTML & CSS</h5>
              <p className="wd-dashboard-course-title">
                Design Beautiful Websites
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3141" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="Java" />
            <div>
              <h5>CS3141 Java</h5>
              <p className="wd-dashboard-course-title">
                Object-Oriented Programming
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/5161" className="wd-dashboard-course-link">
            <Image src="/images/sql.jpg" width={200} height={150} alt="SQL" />
            <div>
              <h5>CS5161 SQL</h5>
              <p className="wd-dashboard-course-title">
                Database Fundamentals
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <Link href="/Courses/7181" className="wd-dashboard-course-link">
            <Image src="/images/machinelearning.jpg" width={200} height={150} alt="Machine Learning" />
            <div>
              <h5>CS7181 Machine Learning</h5>
              <p className="wd-dashboard-course-title">
                Intro to AI & ML
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
