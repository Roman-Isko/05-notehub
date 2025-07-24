import type { FC } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
