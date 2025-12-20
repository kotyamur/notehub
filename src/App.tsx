import miLogo from "./assets/favicon.svg";
import myLogo from "/favicon.svg";
import { useState } from "react";
import {
  // useMutation,
  useQuery,
  keepPreviousData,
  // useQueryClient,
} from "@tanstack/react-query";
import "./App.css";

import { fetchNotes } from "./services/noteService";

import SearchBox from "./components/SearchBox/SearchBox";
import Pagination from "./components/Pagination/Pagination";
import NoteList from "./components/NoteList/NoteList";


function App() {
  const [currentPage, setCurrentPage] = useState(1);

  // const queryClient = useQueryClient();

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["notes", currentPage],
    queryFn: async () => {
      const data = await fetchNotes(currentPage);
      return data;
    },
    placeholderData: keepPreviousData,
  });
  console.log(data);

  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });
  
  const setPage = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <div className="app">
      <header className="toolbar">
        <a href="/index.html" target="_blank">
          <img src={myLogo} className="logo" alt="logo" />
        </a>
        <SearchBox />
        {isSuccess && data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
        <button className="button">
          Create note + <img src={miLogo} className="logo" alt="logo" />
        </button>
      </header>

      {isPending && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess && data.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </div>
  );
}

export default App;
