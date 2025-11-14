import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_HTTP_SERVER || "";

// Get all enrollments for a user
export async function getUserEnrollments(userId: string) {
  const res = await axios.get(`${BASE_URL}/api/users/${userId}/enrollments`);
  return res.data;
}

// Enroll a user in a course
export async function enrollInCourse(userId: string, courseId: string) {
  const res = await axios.post(`${BASE_URL}/api/courses/${courseId}/enrollments`, { userId });
  return res.data;
}

// Unenroll a user from a course
export async function unenrollFromCourse(userId: string, courseId: string) {
  const res = await axios.delete(`${BASE_URL}/api/courses/${courseId}/enrollments/${userId}`);
  return res.data;
}
