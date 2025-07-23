import type { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.card}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <span className={styles.tag}>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
