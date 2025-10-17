"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type CourseNavigationProps = {
  courseId: string; // pass the dynamic course ID from layout
};

export default function CourseNavigation({ courseId }: CourseNavigationProps) {
  const pathname = usePathname();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
      
        const path = link === "People" ? `/Courses/${courseId}/People/Table` : `/Courses/${courseId}/${link}`;

        
        const isActive = pathname === path || pathname.includes(path);

        return (
          <Link
            key={link}
            href={path}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
