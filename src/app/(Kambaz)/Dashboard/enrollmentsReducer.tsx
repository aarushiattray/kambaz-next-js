import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { enrollments } from "../Database";
import { RootState } from "../../(Kambaz)/store";
 
interface Enrollment {
  _id: string;
  user: string;
  course: string;
}
 
interface EnrollmentPayload {
  userId: string;
  courseId: string;
}
 
const initialState = {
  enrollments: enrollments as Enrollment[],
};
 
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<EnrollmentPayload>) => {
      const { userId, courseId } = action.payload;
      if (!state.enrollments.find(e => e.user === userId && e.course === courseId)) {
        state.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
      }
    },
    unenrollCourse: (state, action: PayloadAction<EnrollmentPayload>) => {
      const { userId, courseId } = action.payload;
      const index = state.enrollments.findIndex(e => e.user === userId && e.course === courseId);
      if (index !== -1) state.enrollments.splice(index, 1);
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
  },
});
 
export const { enrollCourse, unenrollCourse, setEnrollments } = enrollmentsSlice.actions;
 

export const selectUserEnrollments = (state: RootState, userId: string) =>
  state.enrollmentsReducer.enrollments.filter((e: Enrollment) => e.user === userId);
 
export default enrollmentsSlice.reducer;