"use client";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <textarea
        id="wd-description"
        rows={7}
        defaultValue={`The assignment is available online Submit a link to the landing page of your Web
application running on Netlify. The landing page should include the following: Your full
name and section Links to each of the lab assignments Link to the Kanbas application
Links to all relevant source code repositories The Kanbas application should include a link
to navigate back to the landing page.`}
      />
      <br />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
   
          <tr>
            <td style={{ width: "40%", textAlign: "right", verticalAlign: "top", padding: "8px 12px" }}>
              <label htmlFor="wd-points">Points</label>
            </td>
            <td style={{ width: "60%", padding: "8px 12px" }}>
              <input id="wd-points" defaultValue={100} style={{ width: "120px" }} />
            </td>
          </tr>

          <tr><td colSpan={2} style={{ height: 12 }} /></tr>

     
          <tr>
            <td style={{ textAlign: "right", verticalAlign: "top", padding: "8px 12px" }}>
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td style={{ padding: "8px 12px" }}>
              <select id="wd-group" defaultValue="ASSIGNMENTS" style={{ width: "200px" }}>
                <option>ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          
          <tr>
            <td style={{ textAlign: "right", verticalAlign: "top", padding: "8px 12px" }}>
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td style={{ padding: "8px 12px" }}>
              <select id="wd-display-grade-as" defaultValue="Percentage" style={{ width: "200px" }}>
                <option>Percentage</option>
              </select>
            </td>
          </tr>

          
          <tr>
            <td style={{ textAlign: "right", verticalAlign: "top", padding: "8px 12px" }}>
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td style={{ padding: "8px 12px" }}>
              <select id="wd-submission-type" defaultValue="Online" style={{ width: "200px" }}>
                <option>Online</option>
              </select>

              <div style={{ height: 10 }} />

              <div style={{ display: "inline-block", textAlign: "left" }}>
                <div style={{ marginBottom: 6 }}>Online Entry Options</div>

                <div style={{ marginBottom: 6 }}>
                  <input type="checkbox" id="wd-text-entry" />
                  <label htmlFor="wd-text-entry" style={{ marginLeft: 8 }}>Text Entry</label>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <input type="checkbox" id="wd-website-url" />
                  <label htmlFor="wd-website-url" style={{ marginLeft: 8 }}>Website URL</label>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <input type="checkbox" id="wd-media-recordings" />
                  <label htmlFor="wd-media-recordings" style={{ marginLeft: 8 }}>Media Recordings</label>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <input type="checkbox" id="wd-student-annotation" />
                  <label htmlFor="wd-student-annotation" style={{ marginLeft: 8 }}>Student Annotation</label>
                </div>

                <div style={{ marginBottom: 6 }}>
                  <input type="checkbox" id="wd-file-upload" />
                  <label htmlFor="wd-file-upload" style={{ marginLeft: 8 }}>File Uploads</label>
                </div>
              </div>
            </td>
          </tr>

          <tr><td colSpan={2} style={{ height: 12 }} /></tr>

         
          <tr>
            <td style={{ width: "40%" }}></td>
            <td style={{ width: "60%", padding: "8px 12px" }}>
              <label htmlFor="wd-assign-to">Assign to</label><br />
              <input id="wd-assign-to" defaultValue="Everyone" style={{ width: "200px" }} />
            </td>
          </tr>

          
          <tr>
            <td style={{ width: "40%" }}></td>
            <td style={{ width: "60%", padding: "8px 12px" }}>
              <label htmlFor="wd-due-date">Due</label><br />
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" style={{ width: "200px" }} />
            </td>
          </tr>

          
          <tr>
            <td style={{ width: "40%" }}></td>
            <td style={{ width: "60%", padding: "8px 12px", display: "flex", gap: "24px" }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="wd-available-from">Available from</label><br />
                <input type="date" id="wd-available-from" defaultValue="2024-05-06" style={{ width: "120px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="wd-available-until">Until</label><br />
                <input type="date" id="wd-available-until" defaultValue="2024-05-20" style={{ width: "120px" }} />
              </div>
            </td>
          </tr>

          <tr><td colSpan={2} style={{ height: 18 }} /></tr>
          <tr><td colSpan={2}><hr /></td></tr>

         
          <tr>
            <td colSpan={2} style={{ textAlign: "right", padding: "8px 12px" }}>
              <button type="button" style={{ marginRight: 8 }}>Cancel</button>
              <button type="button">Save</button>
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        #wd-assignments-editor { font-family: serif; padding: 10px 12px; max-width: 720px; }
        #wd-assignments-editor label[for="wd-name"] { display: block; font-weight: 700; font-size: 1.15rem; margin-bottom: 6px; }
        #wd-assignments-editor textarea { width: 100%; max-width: 680px; white-space: pre-wrap; }
        #wd-assignments-editor input, #wd-assignments-editor select, #wd-assignments-editor textarea { font-family: inherit; font-size: 0.95rem; }
      `}</style>
    </div>
  );
}
