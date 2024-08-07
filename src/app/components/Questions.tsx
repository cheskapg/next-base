import React from 'react';
import BehavorialQuestions from './QuestionsForms/BehavioralQuestions';

const Questions = () => {
  return (
    <div>
      <div className={`flex flex-1 flex-col p-6`}>
        <div className="text-xl">
          Behavioral Health Questions
          <BehavorialQuestions />
        </div>
      </div>
    </div>
  );
};

export default Questions;
