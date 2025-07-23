export type NoteTag = "personal" | "work" | "study" | "other";

export interface Note {
  id: string;
  title: string;
  text: string;
  tag: NoteTag;
  createdAt: string;
}

export interface NoteCreateData {
  title: string;
  text: string;
  tag: NoteTag;
}
