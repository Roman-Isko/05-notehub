import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getNotes } from "../../services/noteService";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";

const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => getNotes(page),
  });

  const filteredNotes = data?.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NoteForm />
      <SearchBox onSearch={setSearch} />
      {isLoading && <Loader />}
      {isError && <p>Something went wrong</p>}
      {filteredNotes && <NoteList notes={filteredNotes} />}
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
};

export default App;
