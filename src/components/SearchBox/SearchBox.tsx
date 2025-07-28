import { useState } from "react";
import type { KeyboardEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmed = inputValue.trim();

      if (!trimmed) {
        toast.error("Введи текст для пошуку!");
        return;
      }

      onSearch(trimmed);
      setInputValue("");
    }
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
