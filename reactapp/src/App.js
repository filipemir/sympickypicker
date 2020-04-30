import React, { useState, useEffect } from 'react';
import './App.css';
import { getSymptoms } from './client/symptoms';
import SymptomPicker from './components/SymptomPicker';

function App() {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    getSymptoms().then(s => setSymptoms(s.results));
  }, []);

  return (
    <div className="App">
      <SymptomPicker symptoms={symptoms}/>
    </div>
  );
}

export default App;
