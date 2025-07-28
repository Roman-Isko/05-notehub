import { useState } from "react";
import type { KeyboardEvent } from "react";
import toast from "react-hot-toast";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const trimmed = inputValue.trim();

      if (!trimmed) {
        toast.error("Enter text to search!");
        return;
      }

      onChange(trimmed);
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
