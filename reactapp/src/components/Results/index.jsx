import React from 'react';
import "./styles.scss";

export default function Results({ diagnosis, possibleDiagnoses }) {
    const { condition, symptom_count } = diagnosis;
    return <div className='results'>
        <div>Thank you! It appears that you have <span className='results__diagnosis'>{condition.name}</span>.</div>
        <div>Here are the most common diagnoses for your symptom:</div>
        <div className='results__wrapper'>
            {possibleDiagnoses.map(d => {
                const { condition, count } = d,
                    freq = count > 0 && symptom_count > 0 ? count / symptom_count : undefined;

                return <div key={condition.id} className='results__result'>
                    <span className='results__result-name'>{condition.name}</span>
                    {freq && <span className='results__result-freq'>{freq.toLocaleString("en", {style: "percent"})}</span>}
                </div>
            })}
        </div>
    </div>
}