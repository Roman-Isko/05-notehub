import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Toaster } from "react-hot-toast";

import { fetchNotes } from "../../services/noteService";

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
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page + 1, debouncedSearch),
    placeholderData: (prev) => prev ?? undefined,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setInputValue(""); // очищення input-а після натискання Enter
  };

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBox
        value={inputValue}
        onChange={setInputValue}
        onSearch={handleSearch}
      />

      <button onClick={() => setIsOpen(true)} className={css.button}>
        Create note+
      </button>

      {isPending && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          forcePage={page}
          pageCount={data.totalPages}
          onPageChange={({ selected }) => setPage(selected)}
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCancel={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
