import type { FormEvent } from "react";
import css from "./SearchBox.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
};

const SearchBox = ({ value, onChange, onSearch }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
