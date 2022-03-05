import { useMoralis } from "react-moralis";

import logo from './logo.svg';
import './App.css';

function App() {
  const { authenticate, isAuthenticated, logout } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div className="App-header">
        <button className="App-login" onClick={() => authenticate()}>Connect Wallet</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button className="App-login" onClick={() => logout()}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
