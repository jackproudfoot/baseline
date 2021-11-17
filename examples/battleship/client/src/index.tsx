import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Setup } from './components/Setup';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

export const App = () => {
  const [appState, setAppState] = useState('setup')

  const startGame = () => {
    setAppState('game')
  }

  return (
    <React.Fragment>
      { appState === 'setup' ? <Setup startGame={startGame} /> : <div>Game started</div> }

    </React.Fragment>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
