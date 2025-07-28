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
  const res = await instance.get<FetchNotesResponse>("/notes", { params }); // ✅ тип відповіді
  return res.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const res = await instance.post<Note>("/notes", data); // ✅ тип відповіді
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  // 🔁 id: number
  const res = await instance.delete<Note>(`/notes/${id}`); // ✅ тип відповіді
  return res.data;
};
