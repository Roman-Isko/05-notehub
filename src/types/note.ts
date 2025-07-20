export type NoteTag = "personal" | "work" | "study" | "other";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}
