import css from "./SearchBox.module.css"

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({value, onChange}: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      // defaultValue={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      placeholder="Search notes"
    />
  );
};

export default SearchBox