import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
  onDelete: (id: string)=> void;
};
const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button} onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
