// Import necessary dependencies
import React from 'react';
import Button from '../component/button'; // Import the Button component

const ScorePage = ({ correctAnswers, totalQuestions, onRestartQuiz }) => {
  // Function to handle restart quiz button click
  const handleRestartClick = () => {
    // Call the onRestartQuiz function passed from the parent component
    if (typeof onRestartQuiz === 'function') {
      onRestartQuiz();
    }
  };

  return (
    <div>
      <h1>Result.</h1>
      <p>Your Score: {correctAnswers}/{totalQuestions}</p>
      <p>Your percentage: ({(correctAnswers / totalQuestions) * 100}%)</p>
      <p>{(correctAnswers / totalQuestions) * 100 < 50 ? 'You are Failed' : 'congrats you are Passed'}</p>
      {/* Render restart quiz button */}
      <Button onClick={handleRestartClick}>Restart Quiz</Button>
    </div>
  );
};

export default ScorePage;
