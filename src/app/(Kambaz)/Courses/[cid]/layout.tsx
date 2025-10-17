import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import Breadcrumb from "./Breadcrumb";


export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = await params; // still using await
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" /> 
        {/* <span> {course?.name} </span> */}
        <Breadcrumb course={course}/>
      </h2>
      <hr />
      <div className="d-flex">
        {/* Sidebar */}
        <div className="d-none d-md-block">
          {/* Pass the course ID to navigation */}
          <CourseNavigation courseId={cid} />
        </div>
        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
