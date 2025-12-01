import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api`;

export const findQuizzesForCourse = async (courseId: string) => {
const res = await axiosWithCredentials.get(`${QUIZZES_API}/courses/${courseId}/quizzes`);
return res.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
const res = await axiosWithCredentials.post(`${QUIZZES_API}/courses/${courseId}/quizzes`, quiz);
return res.data;
};

export const updateQuiz = async (quizId: string, updates: any) => {
const res = await axiosWithCredentials.put(`${QUIZZES_API}/quizzes/${quizId}`, updates);
return res.data;
};

export const deleteQuiz = async (quizId: string) => {
const res = await axiosWithCredentials.delete(`${QUIZZES_API}/quizzes/${quizId}`);
return res.data;
};
