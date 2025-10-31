"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6"; // keep align justify
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  // State to toggle sidebar visibility
  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-flex align-items-center">
        {/* Sandwich icon, Bootstrap red, clickable to toggle sidebar */}
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation courseId={cid as string} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
