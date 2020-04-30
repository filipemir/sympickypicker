import React from 'react';

export default function SymptomPicker({ symptoms, activeSymptom, onSymptomChange }) {
    return <div>
        <select onChange={(evt) => onSymptomChange(symptoms[evt.target.value])} value={activeSymptom.id}>
            <option>Please pick a symptom</option>
            {symptoms.map((s, i) => {
                return <option key={s.id} value={i}>{s.name}</option>
            })}
        </select>
    </div>
}