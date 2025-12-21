import type { InputHTMLAttributes } from "react";
import css from "./SearchBox.module.css";

// type SearchBoxProps = {
//   value: string;
//   // onChange: ChangeEventHandler;
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
// };

type SearchBoxProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      // defaultValue={value}
      onChange={onChange}
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
