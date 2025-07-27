import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage: 12 };
  if (search) params.search = search;
  const res = await instance.get("/notes", { params });
  return res.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const res = await instance.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await instance.delete(`/notes/${id}`);
  return res.data;
};

// import axios from "axios";

// const BASE_URL = "https://notehub-public.goit.study/api";

// const token = import.meta.env.VITE_NOTEHUB_TOKEN;

// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// export const getNotes = async (page: number = 1) => {
//   const response = await instance.get(`/notes?page=${page}`);
//   return response.data;
// };

// export const createNote = async (noteData: { title: string; text: string }) => {
//   const response = await instance.post("/notes", noteData);
//   return response.data;
// };
