"use client";

export default function AssignmentEditor() {
  return (
    <div className="px-4 py-4" style={{ maxWidth: '800px', marginLeft: 0, textAlign: 'left' }}>

      {/* Assignment Name */}
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" className="form-control" />
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
          The assignment is <span className="text-danger">available online</span>
          <br /><br />
          Submit a link to the landing page of your Web application running on Netlify.
          <br /><br />
          The landing page should include the following:
          <br />
          • Your full name and section
          <br />
          • Links to each of the lab assignments
          <br />
          • Link to the Kanbas application
          <br />
          • Links to all relevant source code repositories
          <br /><br />
          The Kanbas application should include a link to navigate back to the landing page.
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-center">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label fw-bold">Points</label>
        <div className="col-sm-9">
          <input id="wd-points" type="number" defaultValue={100} className="form-control" />
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

          {/* Submission Type Box */}
          <div className="border p-3 rounded">

            {/* Online Select */}
            <div className="mb-3">
              <select id="wd-submission-type" defaultValue="Online" className="form-select">
                <option>Online</option>
              </select>
            </div>

            {/* Online Entry Options */}
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

          {/* Assign Box */}
          <div className="border p-3 rounded">

            {/* Assign To */}
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
                defaultValue="2024-05-13T23:59"
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
                  defaultValue="2024-05-06T00:00"
                  className="form-control"
                />
              </div>
              <div className="col">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  defaultValue="2024-05-20T23:59"
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
        <button type="button" className="btn btn-secondary">Cancel</button>
        <button type="button" className="btn btn-danger">Save</button>
      </div>

    </div>
  );
}
