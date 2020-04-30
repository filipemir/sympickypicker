import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import { getSymptoms } from './client/symptoms';
import SymptomPicker from './components/SymptomPicker';
import ConditionPrompt from './components/ConditionPrompt';
import { getDiagnostic, incrementDiagnostic, getDiagnoses } from './client/diagnostics';
import Results from './components/Results';

const STATUS = {
  IDLE: 0,
  DIAGNOSIS: 1,
  RESULTS: 2,
  NO_RESULTS: 3
}

function App() {
  const [status, setStatus] = useState(STATUS.IDLE),
    [symptoms, setSymptoms] = useState([]),
    [activeSymptom, setActiveSymptom] = useState(),
    [conditionHypothesis, setConditionHypothesis] = useState(),
    [diagnosis, setDiagnosis] = useState(),
    [diagnoses, setDiagnoses]= useState(),
    onConditionConfirmed = () => {
      incrementDiagnostic({ symptom: activeSymptom, condition: conditionHypothesis.condition});
      setDiagnosis(conditionHypothesis);
    },
    getNextDiagnostic = useCallback(async () => {
      if (!activeSymptom) {
        return;
      }
      const condition = await getDiagnostic({ symptom: activeSymptom });
      if (condition) {
        setConditionHypothesis(condition)
        setStatus(STATUS.DIAGNOSIS);
      } else {
        setStatus(STATUS.NO_RESULTS);
      }
    }, [activeSymptom]),
    onReset = () => {
      setActiveSymptom();
      setStatus(STATUS.IDLE);
    };

  useEffect(() => {
    getSymptoms().then(s => setSymptoms(s.results));
  }, []);

  useEffect(() => {
    getNextDiagnostic();
  }, [getNextDiagnostic]);

  useEffect(() => {
    activeSymptom && getDiagnoses({ symptom: activeSymptom }).then(d => {
      setDiagnoses(d.results);
      diagnosis && setStatus(STATUS.RESULTS);
    });
  }, [diagnosis]);

  return (
    <div className="App">
      <div className="App__top-row">
        <span className="App__picker"><SymptomPicker symptoms={symptoms} activeSymptom={symptoms} onSymptomChange={setActiveSymptom}/></span>
        <span className="App__reset"><button onClick={onReset}>Reset</button></span>
      </div>
      {status === STATUS.DIAGNOSIS && <ConditionPrompt 
        activeSymptom={activeSymptom}
        conditionHypothesis={conditionHypothesis}
        onConditionConfirmed={onConditionConfirmed}
        onConditionRejected={getNextDiagnostic}
      />}
      {status === STATUS.RESULTS && <Results diagnosis={diagnosis} possibleDiagnoses={diagnoses} />}
    </div>
  );
}

export default App;
