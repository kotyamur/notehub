import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";

// type SearchBoxProps = {
//   value: string;
//   // onChange: ChangeEventHandler;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// };

// type SearchBoxProps = Pick<
//   InputHTMLAttributes<HTMLInputElement>,
//   "value" | "onChange"
// >;

type SearchBoxProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const SearchBox = ({ value, onChange }: SearchBoxProps) => {

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      // value={value}
      defaultValue={value}
      onChange={handleFilterChange}
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
