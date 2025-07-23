import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/noteService";

import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import type { Note } from "../../types/note";

const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => getNotes(page),
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Failed to load notes." />;

  const filteredNotes =
    data?.notes.filter((note: Note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  return (
    <div>
      <h1>NoteHub</h1>
      <NoteForm />
      <SearchBox onSearch={setSearch} />
      {filteredNotes.map((note: Note) => (
        <p key={note.id}>{note.title}</p>
      ))}
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default App;

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getNotes } from "../../services/noteService";

// import NoteList from "../NoteList/NoteList";
// import NoteForm from "../NoteForm/NoteForm";
// import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";

// import type { Note } from "../../types/note";

// const App = () => {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const {
//     data: notes,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["notes"],
//     queryFn: () => getNotes(1),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading notes</p>;

//   const filteredNotes =
//     notes?.filter((note) => note.title.includes("test")) ?? [];

//   return (
//     <div>
//       <h1>NoteHub</h1>
//       <NoteForm />
//       <SearchBox onSearch={setSearch} />
//       {isLoading && <Loader />}
//       {isError && <ErrorMessage message="Failed to load notes." />}
//       {filteredNotes.map((note) => (
//         <p key={note.id}>{note.title}</p>
//       ))}
//       <Pagination
//         currentPage={page}
//         totalPages={data?.totalPages || 10}
//         onPageChange={setPage}
//       />
//     </div>
//   );
// };

// export default App;
