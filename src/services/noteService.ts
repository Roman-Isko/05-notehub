import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const getNotes = async (page: number): Promise<Note[]> => {
  const res = await API.get(`/notes?page=${page}`);
  return res.data.results;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const res = await API.post("/notes", note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await API.delete(`/notes/${id}`);
};
