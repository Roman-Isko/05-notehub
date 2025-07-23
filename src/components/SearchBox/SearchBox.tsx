import type { FC } from "react";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
