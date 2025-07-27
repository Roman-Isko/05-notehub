import css from "./SearchBox.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: Props) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// import css from "./SearchBox.module.css";

// interface Props {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function SearchBox({ value, onChange }: Props) {
//   return (
//     <div className={css.searchBox}>
//       <label>
//         Search:
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className={css.input}
//         />
//       </label>
//     </div>
//   );
// }
