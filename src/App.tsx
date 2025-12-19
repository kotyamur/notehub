import miLogo from './assets/favicon.svg'
import myLogo from '/favicon.svg'
import './App.css'
import SearchBox from './components/SearchBox/SearchBox';
import Pagination from './components/Pagination/Pagination';

function App() {

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
