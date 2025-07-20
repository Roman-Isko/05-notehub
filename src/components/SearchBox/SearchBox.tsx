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

// import css from "./SearchBox.module.css";

// interface SearchBoxProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// const SearchBox = ({ value, onChange }: SearchBoxProps) => {
//   return (
//     <input
//       className={css.input}
//       type="text"
//       placeholder="Search notes"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   );
// };

// export default SearchBox;
