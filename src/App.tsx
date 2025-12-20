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

function App() {
  // const queryClient = useQueryClient();

  const { data } = useQuery({
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
      <a href="/index.html" target="_blank">
        <img src={myLogo} className="logo" alt="logo" />
        <img src={miLogo} className="logo" alt="logo" />
      </a>
      <header className="toolbar">
        <SearchBox />
        <Pagination />
        <button className="button">Create note +</button>
      </header>
    </div>
  );
}

export default App
