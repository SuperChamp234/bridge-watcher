import * as React from 'react';
import Temperature from './components/Temperature';
import Database from './components/Database';
import { Button } from '@mui/material';
import './App.css';
function App() {
  return (
    <div className="App">
      <h1 className='App-header'>Bridge Watcher</h1>
      <Temperature temp="25"></Temperature>
      <Database></Database>
      <Button onClick={() => {
        alert('Overload');
        }}
        variant="contained">Test Overload
      </Button>
    </div>
  );
}

export default App;
