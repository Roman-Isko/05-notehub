export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number; // 🔁 Було string
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // ✅ Додано
}
