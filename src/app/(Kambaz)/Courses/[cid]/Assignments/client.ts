import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_HTTP_SERVER;
if (!BASE_URL) throw new Error("NEXT_PUBLIC_HTTP_SERVER is not defined");

// Defining a simple Assignment type 
export interface Assignment {
  _id?: string;
  title: string;
  description?: string;
  dueDate?: string;
  course?: string;
}

export async function findAssignmentsForCourse(courseId: string): Promise<Assignment[]> {
  const res = await axios.get<Assignment[]>(`${BASE_URL}/api/courses/${courseId}/assignments`);
  return res.data;
}

export async function createAssignmentForCourse(courseId: string, assignment: Assignment): Promise<Assignment> {
  const res = await axios.post<Assignment>(`${BASE_URL}/api/courses/${courseId}/assignments`, assignment);
  return res.data;
}

export async function updateAssignment(assignment: Assignment): Promise<Assignment> {
  if (!assignment._id) throw new Error("Assignment must have _id to update");
  const res = await axios.put<Assignment>(`${BASE_URL}/api/assignments/${assignment._id}`, assignment);
  return res.data;
}

export async function deleteAssignment(assignmentId: string): Promise<{ success: boolean }> {
  const res = await axios.delete<{ success: boolean }>(`${BASE_URL}/api/assignments/${assignmentId}`);
  return res.data;
}
