import miLogo from './assets/favicon.svg'
import myLogo from '/favicon.svg'
import {
  // useMutation,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import './App.css'
import SearchBox from './components/SearchBox/SearchBox';
import Pagination from './components/Pagination/Pagination';
import { fetchNotes } from './services/noteService';
import NoteList from './components/NoteList/NoteList';

function App() {
  // const queryClient = useQueryClient();

  const { isPending, isError, data, error, isSuccess} = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const data = await fetchNotes();

      return data;
    },
  });
 console.log(data);

  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["todos"] });
  //   },
  // });

  return (
    <div className="app">
      <header className="toolbar">
        <a href="/index.html" target="_blank">
          <img src={myLogo} className="logo" alt="logo" />
        </a>
        <SearchBox />
        <Pagination />
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

export default App
