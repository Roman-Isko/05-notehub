import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.card}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <span className={css.tag}>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
