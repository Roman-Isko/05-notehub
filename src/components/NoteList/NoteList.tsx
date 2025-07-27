import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.item}>
          <h2>{title}</h2>
          <p>{content}</p>
          <span>{tag}</span>
          <button className={css.delete} onClick={() => mutation.mutate(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

// import type { Note } from "../../types/note";
// import css from "./NoteList.module.css";

// interface Props {
//   notes: Note[];
//   onDelete: (id: string) => void;
// }

// const NoteList = ({ notes, onDelete }: Props) => {
//   return (
//     <ul className={css.list}>
//       {notes.map((note) => (
//         <li key={note.id} className={css.card}>
//           <h3>{note.title}</h3>
//           <p>{note.text}</p>
//           <span className={css.tag}>{note.tag}</span>
//           <button className={css.delete} onClick={() => onDelete(note.id)}>
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default NoteList;
