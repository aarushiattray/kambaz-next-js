export default function CourseStatus() {
    return (
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <button>Unpublish</button> <button>Publish</button>
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <button>Import Existing Content</button>
          <button>Import from Commons</button>
          <button>Choose Home Screen</button>
          <button>View Course Stream</button>
          <button>New Announcement</button>
          <button>New Analytics</button>
        </div>
        <button style={{ marginTop: "8px" }}>View Course Notifications</button>
      </div>
    );
  }
  