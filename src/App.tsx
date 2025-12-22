import miLogo from "./assets/favicon.svg";
import myLogo from "/favicon.svg";
import { useState } from "react";
import { useMutation, useQuery, keepPreviousData, useQueryClient} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import "./App.css";

import { deleteNoteById, fetchNotes } from "./services/noteService";

import SearchBox from "./components/SearchBox/SearchBox";
import Pagination from "./components/Pagination/Pagination";
import NoteList from "./components/NoteList/NoteList";
import Modal from "./components/Modal/Modal";
import NoteForm from "./components/NoteForm/NoteForm";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [search] = useDebounce(filter, 1000);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, search],
    queryFn: async () => {
      const data = await fetchNotes(currentPage, search);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteNoteById(id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["notes", currentPage, search],
      });
    },
  });

  const deleteNote = async (id: string) => {
    mutation.mutate(id);
  };

  const setPage = (num: number) => {
    setCurrentPage(num);
  };

  const onOpenModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="app">
      <header className="toolbar">
        <a href="/index.html" target="_blank">
          <img src={myLogo} className="logo" alt="logo" />
        </a>

        <SearchBox value={filter} onChange={setFilter} />
        {isSuccess && data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
        <button className="button" onClick={onOpenModal}>
          Create note + <img src={miLogo} className="logo" alt="logo" />
        </button>
      </header>

      {isPending && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess && data.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={deleteNote} />
      )}

      {isOpenModal && (
        <Modal onClose={onCloseModal}>
          <NoteForm onClose={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
