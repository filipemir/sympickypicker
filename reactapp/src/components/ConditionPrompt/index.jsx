import React from 'react';
import "./styles.scss";

export default function ConditionPrompt({ activeSymptom, conditionHypothesis, onConditionConfirmed, onConditionRejected }) {
    const { condition } = conditionHypothesis;
    return <div className='condition-prompt'>
        <div className='condition-prompt__par'>You're experiencing <span className='condition-prompt__active'>{activeSymptom.name}</span>.</div>
        <div className='condition-prompt__par'>We've found that <span className='condition-prompt__hypothesis'>{condition.name}</span> is one of the most common causes for that symptom.</div>
        <div className='condition-prompt__par'>Do you think you might have that?</div>
        <div className='condition-prompt__btns'>
            <button onClick={() => onConditionConfirmed(conditionHypothesis)}>Yes</button>
            <button onClick={() => onConditionRejected(conditionHypothesis)}>No</button>
        </div>
    </div>
}