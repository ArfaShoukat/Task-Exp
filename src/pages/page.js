
import React, { useState, useEffect } from 'react';
import quizData from '../data/quizData.json';
import ProgressBar from '@/component/ProgressBar';
import ScoreBar from '../component/ScoreBar';
import Button from '../component/Button';
import Result from '../component/Result';
import Star from '../component/Star';
import OptionButton from '../component/OptionButton';

const Quiz = () => {
  const totalQuestions = quizData.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    shuffleOptions();
    setStarCount(getStarCount());
  }, [currentQuestionIndex]);

  
  const decodedQuestions = quizData.map((questionObj, index) => {
    try {
      const decodedQuestion = decodeURIComponent(questionObj.question);
      const decodedOptions = questionObj.incorrect_answers
        ? questionObj.incorrect_answers.map(option =>
          decodeURIComponent(option)
        )
        : [];
      const decodedCorrectAnswer = decodeURIComponent(
        questionObj.correct_answer
      );

      return {
        ...questionObj,
        question: decodedQuestion,
        options: [...decodedOptions, decodedCorrectAnswer].sort(() => Math.random() - 0.5),
        correct_answer: decodedCorrectAnswer
      };
    } catch (error) {
      console.error(`Error decoding question ${index}:`, error);
      console.log('Question Object:', questionObj);
      return null;
    }
  }).filter(question => question !== null);

  const shuffleOptions = () => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < totalQuestions) {
      const correctAnswer = decodeURIComponent(decodedQuestions[currentQuestionIndex].correct_answer);
      const incorrectAnswers = decodedQuestions[currentQuestionIndex].incorrect_answers.map(answer => decodeURIComponent(answer));
      const options = [...incorrectAnswers, correctAnswer];
      options.sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    }
  };

  const handleAnswerClick = (answer) => {
    setRemainingQuestions(prevremainingQuestions => prevremainingQuestions - 1);
    setAnswered(prevAnswered => prevAnswered + 1);
    setSelectedAnswer(answer);

    if (
      answer ===
      decodeURIComponent(decodedQuestions[currentQuestionIndex].correct_answer)
    ) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
      setAnswerFeedback('Correct!');
    } else {
      setAnswerFeedback('Incorrect!');
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedAnswer(null);
    setAnswerFeedback(null);
  };

  const calculateScore = () => {
    const maxScorePercentage = (correctAnswers / answered) * 100;
    return isNaN(maxScorePercentage) ? 0 : Math.round(maxScorePercentage);
  };

  const predictScoreIfAllCorrect = () => {
    const totalCorrect = correctAnswers + remainingQuestions;
    const predictCorrect = (totalCorrect / totalQuestions) * 100;
    return isNaN(predictCorrect) ? 0 : Math.round(predictCorrect);
  };

  const predictScoreIfAllWrong = () => {
    const predictWrong = (correctAnswers / totalQuestions) * 100;
    return isNaN(predictWrong) ? 0 : Math.round(predictWrong);
  };

  const getStarCount = () => {
    const difficulty = decodedQuestions[currentQuestionIndex]?.difficulty;
    if (difficulty === 'easy') return 1;
    if (difficulty === 'medium') return 2;
    if (difficulty === 'hard') return 3;
    return 0;
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setAnswered(0);
    setRemainingQuestions(totalQuestions);
    setAnswerFeedback(null);
    setStarCount(getStarCount());
  };

  return (
    <>
      <div className="container w-screen p-4 md:p-0 md:max-w-3xl mx-auto">
        {currentQuestionIndex < totalQuestions ? (
          <>
            <div>
              <ProgressBar
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
              />
            </div>
            <div>
              <div className="mb-16">
                <br/><br/>
                <h1 className="text-2xl md:text-3xl font-bold mb-2  md:mb-4 flex items-center">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </h1>
                <span>
  {decodedQuestions[currentQuestionIndex]?.category &&
    (
      decodedQuestions[currentQuestionIndex]?.category.startsWith("Entertainment") ?
        decodeURIComponent(decodedQuestions[currentQuestionIndex]?.category) :
        `Entertainment: ${decodeURIComponent(decodedQuestions[currentQuestionIndex]?.category)}`
    )
  }
</span>




                <div className="flex items-center mt-2">
                  {[...Array(3)].map((_, index) => (
                    <Star key={index} filled={index < starCount} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-2">
              {decodeURIComponent(
                decodedQuestions[currentQuestionIndex].question
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 justify-center">
              {shuffledOptions.map((answer, index) => (
                <OptionButton
                  key={index}
                  answer={answer}
                  selectedAnswer={selectedAnswer}
                  onClick={handleAnswerClick}
                />
              ))}
            </div>
            <center>
              <div className="mt-4">
                {answerFeedback && (
                  <span style={{ fontSize: '1.5rem' }}>
                    {answerFeedback}
                  </span>
                )}
              </div>
              <div className="mt-4">
                {selectedAnswer && (
                  <Button onClick={handleNextQuestion} disabled={!selectedAnswer}>
                    Next Question
                  </Button>
                )}
              </div>
            </center>
            <div className="mt-4">
              <ScoreBar
                bgcolor="gray"
                completed={calculateScore()}
                predictCorrect={predictScoreIfAllCorrect()}
                predictWrong={predictScoreIfAllWrong()}
              />
            </div>
          </>
        ) : (
          <Result
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            calculateScore={calculateScore}
            handleRestart={handleRestart}
          />
        )}
      </div>
    </>
  );
};

export default Quiz;
