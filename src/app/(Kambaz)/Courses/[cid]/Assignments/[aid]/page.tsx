"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import assignments from "../../../../Database/assignments.json";
import courses from "../../../../Database/courses.json";

// Defining types because was getting build errors otherwsie and was not deploying to Vercel
interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  availableDate: string;
  dueDate: string;
}

interface Course {
  _id: string;
  name: string;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();

  const assignment = (assignments as Assignment[]).find(
    (a) => a._id === aid && a.course === cid
  );
  const course = (courses as Course[]).find((c) => c._id === cid);

  if (!assignment || !course) {
    return <div className="p-4">Assignment not found.</div>;
  }

  // Map month name to number
  const monthMap: { [key: string]: string } = {
    January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
    July: "07", August: "08", September: "09", October: "10", November: "11", December: "12"
  };

  // Convert "May 6" -> "YYYY-MM-DDTHH:mm"
  const parseDate = (dateStr: string | undefined, endOfDay = false): string => {
    if (!dateStr) return "";
    const parts = dateStr.split(" ");
    if (parts.length !== 2) return "";
    const [monthName, dayStr] = parts;
    const month = monthMap[monthName];
    if (!month) return "";
    const day = dayStr.padStart(2, "0");
    const year = new Date().getFullYear();
    const hours = endOfDay ? "23" : "00";
    const minutes = endOfDay ? "59" : "00";
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const availableFrom = parseDate(assignment.availableDate);
  const dueDate = parseDate(assignment.dueDate, true);
  const availableUntil = dueDate;

  return (
    <div className="px-4 py-4" style={{ maxWidth: '800px', marginLeft: 0, textAlign: 'left' }}>
      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
        <input id="wd-name" defaultValue={assignment.title} className="form-control" />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <div
          id="wd-description"
          className="form-control"
          contentEditable
          suppressContentEditableWarning
          style={{ minHeight: '150px', whiteSpace: 'pre-wrap' }}
        >
          {assignment.description}
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label fw-bold">Points</label>
        <div className="col-sm-9">
          <input id="wd-points" type="number" defaultValue={assignment.points} className="form-control" />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="wd-group" className="col-sm-3 col-form-label fw-bold">Assignment Group</label>
        <div className="col-sm-9">
          <select id="wd-group" defaultValue="ASSIGNMENTS" className="form-select">
            <option>ASSIGNMENTS</option>
          </select>
        </div>
      </div>

      {/* Display Grade As */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label fw-bold">Display Grade as</label>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" defaultValue="Percentage" className="form-select">
            <option>Percentage</option>
          </select>
        </div>
      </div>

      {/* Submission Type Section */}
      <div className="row mb-3 align-items-start">
        <label className="col-sm-3 col-form-label fw-bold">Submission Type</label>
        <div className="col-sm-9">
          <div className="border p-3 rounded">
            <div className="mb-3">
              <select id="wd-submission-type" defaultValue="Online" className="form-select">
                <option>Online</option>
              </select>
            </div>
            <div className="fw-bold mb-2">Online Entry Options</div>
            <div className="form-check mb-1">
              <input type="checkbox" id="wd-text-entry" className="form-check-input" />
              <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
            </div>
            <div className="form-check mb-1">
              <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked />
              <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
            </div>
            <div className="form-check mb-1">
              <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
              <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
            </div>
            <div className="form-check mb-1">
              <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
              <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
            </div>
            <div className="form-check mb-1">
              <input type="checkbox" id="wd-file-upload" className="form-check-input" />
              <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Section */}
      <div className="row mb-3 align-items-start">
        <label className="col-sm-3 col-form-label fw-bold">Assign</label>
        <div className="col-sm-9">
          <div className="border p-3 rounded">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
              <div className="form-control d-flex align-items-center flex-wrap" style={{ minHeight: '40px' }}>
                <span className="badge bg-secondary text-dark d-flex align-items-center me-1 mb-1">
                  Everyone
                  <button
                    type="button"
                    className="btn-close btn-close-black btn-sm ms-1"
                    aria-label="Remove"
                  ></button>
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
              <input
                type="datetime-local"
                id="wd-due-date"
                defaultValue={dueDate}
                className="form-control"
              />
            </div>

            {/* Available From / Until */}
            <div className="row g-3">
              <div className="col">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  defaultValue={availableFrom}
                  className="form-control"
                />
              </div>
              <div className="col">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue={availableUntil}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Black line above buttons */}
      <hr className="border-dark mt-4" />

      {/* Bottom-right buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">Cancel</Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
      </div>
    </div>
  );
}
