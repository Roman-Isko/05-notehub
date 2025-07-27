import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import toast, { Toaster } from "react-hot-toast";

import { fetchNotes, createNote } from "../../services/noteService";

import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";

import css from "./App.module.css";

function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page + 1, debouncedSearch),
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpen(false);
    },
    onError: () => toast.error("Failed to create note"),
  });

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBox value={search} onChange={setSearch} />
      <button onClick={() => setIsOpen(true)} className={css.button}>
        Create note+
      </button>

      {isPending && <Loader />}
      {isError && <ErrorMessage />}
      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            forcePage={page}
            pageCount={data.totalPages}
            onPageChange={({ selected }) => setPage(selected)}
          />
        </>
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onSubmit={mutation.mutate} />
        </Modal>
      )}
    </div>
  );
}

export default App;

// import { useState } from "react";
// import { nanoid } from "nanoid";

// import NoteList from "../NoteList/NoteList";
// import SearchBox from "../SearchBox/SearchBox";
// import NoteForm from "../NoteForm/NoteForm";
// import Modal from "../Modal/Modal";

// import type { Note } from "../../types/note";
// import css from "./App.module.css";

// const App = () => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const visibleNotes = notes.filter((note) =>
//     note.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const addNote = (note: Omit<Note, "id">) => {
//     const newNote = { ...note, id: nanoid() };
//     setNotes((prev) => [...prev, newNote]);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className={css.container}>
//       <SearchBox value={search} onSearch={setSearch} />
//       <button className={css.button} onClick={() => setIsModalOpen(true)}>
//         Create note+
//       </button>
//       <NoteList notes={visibleNotes} />
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onAdd={addNote} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default App;
