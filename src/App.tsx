import miLogo from './assets/favicon.svg'
import myLogo from '/favicon.svg'
import './App.css'

function App() {

  return (
    <div>
      <a href="/index.html" target="_blank">
        <img src={myLogo} className="logo" alt="logo" />
        <img src={miLogo} className="logo" alt="logo" />
      </a>
    </div>
  );
}

export default App
