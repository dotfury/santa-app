import { useState } from 'react';
import './App.css';

import Form from './components/Form/Form';
import NoUser from './components/NoUser/NoUser';
import BadAge from './components/BadAge/BadAge';
import { messages } from './utils/constants';

function App() {
  const [appState, setAppState] = useState<string>('OK');

  return (
    <div className="App">
      <header>
        <h1>A letter to Santa</h1>
      </header>
      {
        (appState === messages.OK && <Form onAppState={ (message: string) => setAppState(message) } />) ||
        (appState === messages.NO_USER && <NoUser />) ||
        (appState === messages.BAD_AGE && <BadAge />)
      }
    </div>
  );
}

export default App;
