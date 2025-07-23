import axios from "axios";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getNotes = async (page: number = 1) => {
  const response = await instance.get(`/notes?page=${page}`);
  return response.data;
};

export const createNote = async (noteData: { title: string; text: string }) => {
  const response = await instance.post("/notes", noteData);
  return response.data;
};

console.log("TOKEN:", import.meta.env.VITE_NOTEHUB_TOKEN);
