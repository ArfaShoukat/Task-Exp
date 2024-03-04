
// import React, { useState, useEffect } from 'react';
// import quizData from '../data/quizData.json';
// import ProgressBar from '../component/progressBar';
// import ScoreBar from '../component/scoreBar'; 
// import './index.css';

// const Star = ({ filled }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill={filled ? 'black' : 'none'}
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="feather feather-star"
//       width="16"
//       height="16"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   );
// };

// const Quiz = () => {
//   const totalQuestions = quizData.length;
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [answered, setAnswered] = useState(0);
//   const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);


//   const isAnswerCorrect = () => {
//     return (
//       selectedAnswer ===
//       decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//     );
//   };

//   const handleAnswerClick = (answer) => {
//     setRemainingQuestions(prevremainingQuestions => prevremainingQuestions - 1);
//     setAnswered(prevAnswered => prevAnswered + 1);
//     setSelectedAnswer(answer);

//     if (
//       answer ===
//       decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//     ) {
//       setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     setSelectedAnswer(null);
//   };

  

//   const calculateScore = () => {
//     const maxScorePercentage = (correctAnswers / answered) * 100;
//     return isNaN(maxScorePercentage) ? 0 : Math.round(maxScorePercentage);
//   };

//   const predictScoreIfAllCorrect = () => {
//     const totalCorrect = correctAnswers + remainingQuestions;
//     const predictCorrect = (totalCorrect / totalQuestions) * 100;
//     return isNaN(predictCorrect) ? 0 : Math.round(predictCorrect);
//   };

//   const predictScoreIfAllWrong = () => {
//     const predictWrong = (correctAnswers / totalQuestions) * 100;
//     return isNaN(predictWrong) ? 0 : Math.round(predictWrong);
//   };

//   const decodedQuestions = quizData
//     .map((questionObj, index) => {
//       try {
//         const decodedQuestion = decodeURIComponent(questionObj.question);
//         const decodedOptions = questionObj.incorrect_answers
//           ? questionObj.incorrect_answers.map(option =>
//               decodeURIComponent(option)
//             )
//           : [];
//         const decodedCorrectAnswer = decodeURIComponent(
//           questionObj.correct_answer
//         );

//         return {
//           ...questionObj,
//           question: decodedQuestion,
//           options: [...decodedOptions, decodedCorrectAnswer],
//           correct_answer: decodedCorrectAnswer
//         };
//       } catch (error) {
//         console.error(`Error decoding question ${index}:`, error);
//         console.log('Question Object:', questionObj);
//         return null;
//       }
//     })
//     .filter(question => question !== null);

//   let starCount = 0;
//   if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'easy'
//   ) {
//     starCount = 1;
//   } else if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'medium'
//   ) {
//     starCount = 2;
//   } else if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'hard'
//   ) {
//     starCount = 3;
//   }

//   return (
//     <>
//       <div className="container">
//         {currentQuestionIndex < totalQuestions ? (
//           <>
//             <div >
//               <ProgressBar
//                 currentQuestion={currentQuestionIndex + 1}
//                 totalQuestions={totalQuestions}
//               />
//             </div>
//             <center>
//               <div >
//                 <div>
//                   <h1>
//                     Question {currentQuestionIndex + 1} of {totalQuestions}
//                   </h1>
//                 </div>
//                 <div style={{ marginTop: '-4vh' }}>
//                   <span>
//                     {decodeURIComponent(
//                       quizData[currentQuestionIndex].category
//                     )}
//                   </span>
//                 </div>
//                 <div>
//                   <div>
//                     <h1 className="text-3xl font-bold mb-4">
//                       Question {currentQuestionIndex + 1} of {totalQuestions}
//                     </h1>
//                     <p>Entertainment: Board game</p>
//                     <div className="flex items-center justify-center ">
//                       {[...Array(3)].map((_, index) => (
//                         <Star key={index} filled={index < starCount} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </center>{' '}
//             <br />
//             <div>
//               <div className=" flex items-center justify-center ">
//                 {decodeURIComponent(
//                   quizData[currentQuestionIndex].question
//                 )}
//               </div>
//             </div>

//             <div className="buttons-opt">
//               {[
//                 ...quizData[currentQuestionIndex].incorrect_answers,
//                 decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//               ].map((answer, index) => (
//                 <div key={index}>
//                   <button
//                     className={`choice_buttons ${
//                       selectedAnswer === answer ? 'selected' : ''
//                     }`}
//                     onClick={() => handleAnswerClick(answer)}
//                     disabled={selectedAnswer !== null}
//                     style={{
//                       color: selectedAnswer === answer ? 'white' : 'black',
//                       backgroundColor:
//                         selectedAnswer === answer ? 'black' : 'transparent',
//                       width: '20vw',
//                       padding: '1vw',
//                       marginLeft: '2vw',
//                       marginRight: '2vw',
//                       marginBottom: '5vh',
//                       border: '1px solid black',
//                       borderRadius: '8px'
//                     }}
//                   >
//                     {decodeURIComponent(answer)}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <br />
//             <br />
//             <div className="feedback">
//               <center>
//                 {selectedAnswer && (
//                   <span style={{ fontSize: '1.5rem', marginRight: '3vw' }}>
//                     {isAnswerCorrect() ? 'Correct!' : 'Sorry!'}
//                   </span>
//                 )}
//               </center>
//             </div>
//             <div style={{ marginTop: '1.5vh' }}>
//               <center>
//                 {selectedAnswer && (
//                   <button
//                     onClick={handleNextQuestion}
//                     className={`submit-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-7 rounded mt-4 `}
//                   >
//                     Next Question
//                   </button>
//                 )}
//               </center>
//             </div>

//             <div>
//               <div>
//                 <center>
//                   <ScoreBar
//                     bgcolor="gray"
//                     completed={calculateScore()}
//                     predictCorrect={predictScoreIfAllCorrect()}
//                     predictWrong={predictScoreIfAllWrong()}
//                   />
//                 </center>
//               </div>
//             </div>
//           </>
//         ) : (
//           <>
//             <div className=" ">
//               <h1>Result.</h1>
//               <p>
//                 Your Score: {correctAnswers}/{totalQuestions}
//               </p>
//               <p>
//                 Your percentage: ({calculateScore()}
//                 %)
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Quiz;



// import React, { useState, useEffect } from 'react';
// import quizData from '../data/quizData.json';
// import ProgressBar from '../component/progressBar';
// import ScoreBar from '../component/scoreBar';

// const Star = ({ filled }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill={filled ? 'black' : 'none'}
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="feather feather-star"
//       width="16"
//       height="16"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   );
// };

// const Quiz = () => {
//   const totalQuestions = quizData.length;
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [answered, setAnswered] = useState(0);
//   const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);
//   const [answerFeedback, setAnswerFeedback] = useState(null); // State to store answer feedback

//   const isAnswerCorrect = () => {
//     return (
//       selectedAnswer ===
//       decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//     );
//   };

//   const handleAnswerClick = (answer) => {
//     setRemainingQuestions(prevremainingQuestions => prevremainingQuestions - 1);
//     setAnswered(prevAnswered => prevAnswered + 1);
//     setSelectedAnswer(answer);

//     if (
//       answer ===
//       decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//     ) {
//       setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
//       setAnswerFeedback('Correct!');
//     } else {
//       setAnswerFeedback('Incorrect!');
//     }
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     setSelectedAnswer(null);
//     setAnswerFeedback(null); // Reset answer feedback when moving to the next question
//   };

//   const calculateScore = () => {
//     const maxScorePercentage = (correctAnswers / answered) * 100;
//     return isNaN(maxScorePercentage) ? 0 : Math.round(maxScorePercentage);
//   };

//   const predictScoreIfAllCorrect = () => {
//     const totalCorrect = correctAnswers + remainingQuestions;
//     const predictCorrect = (totalCorrect / totalQuestions) * 100;
//     return isNaN(predictCorrect) ? 0 : Math.round(predictCorrect);
//   };

//   const predictScoreIfAllWrong = () => {
//     const predictWrong = (correctAnswers / totalQuestions) * 100;
//     return isNaN(predictWrong) ? 0 : Math.round(predictWrong);
//   };

//   const decodedQuestions = quizData
//     .map((questionObj, index) => {
//       try {
//         const decodedQuestion = decodeURIComponent(questionObj.question);
//         const decodedOptions = questionObj.incorrect_answers
//           ? questionObj.incorrect_answers.map(option =>
//               decodeURIComponent(option)
//             )
//           : [];
//         const decodedCorrectAnswer = decodeURIComponent(
//           questionObj.correct_answer
//         );

//         return {
//           ...questionObj,
//           question: decodedQuestion,
//           options: [...decodedOptions, decodedCorrectAnswer],
//           correct_answer: decodedCorrectAnswer
//         };
//       } catch (error) {
//         console.error(`Error decoding question ${index}:`, error);
//         console.log('Question Object:', questionObj);
//         return null;
//       }
//     })
//     .filter(question => question !== null);

//   let starCount = 0;
//   if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'easy'
//   ) {
//     starCount = 1;
//   } else if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'medium'
//   ) {
//     starCount = 2;
//   } else if (
//     decodedQuestions[currentQuestionIndex] &&
//     decodedQuestions[currentQuestionIndex].difficulty === 'hard'
//   ) {
//     starCount = 3;
//   }

//   return (
//     <>
//       <div className="container w-screen p-4 md:p-0 md:max-w-3xl mx-auto">
//         {currentQuestionIndex < totalQuestions ? (
//           <>
//             <div>
//               <ProgressBar
//                 currentQuestion={currentQuestionIndex + 1}
//                 totalQuestions={totalQuestions}
//               />
//             </div>
//             <div>
//               <div>
//                 <br/><br/><br/><br/><br/>
//                 <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center justify-center">
//                   Question {currentQuestionIndex + 1} of {totalQuestions}
//                 </h1>
//                 <p className='flex items-center justify-center'>Entertainment: Board game</p>
//                 <div className="flex items-center justify-center ">
//                   {[...Array(3)].map((_, index) => (
//                     <Star key={index} filled={index < starCount} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4">
//               {decodeURIComponent(
//                 quizData[currentQuestionIndex].question
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 justify-center">
//               {[
//                 ...quizData[currentQuestionIndex].incorrect_answers,
//                 decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
//               ].map((answer, index) => (
//                 <div key={index} className="text-center">
//                   <button
//                     className={`choice_buttons ${
//                       selectedAnswer === answer ? 'selected' : ''
//                     }`}
//                     onClick={() => handleAnswerClick(answer)}
//                     disabled={selectedAnswer !== null}
//                     style={{
//                       color: selectedAnswer === answer ? 'white' : 'black',
//                       backgroundColor:
//                         selectedAnswer === answer ? 'black' : 'transparent',
//                       width: '100%',
//                       padding: '1rem',
//                       border: '1px solid black',
//                       borderRadius: '8px'
//                     }}
//                   >
//                     {decodeURIComponent(answer)}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <center>
//             <div className="mt-4">
//               {answerFeedback && (
//                 <span style={{ fontSize: '1.5rem', marginRight: '3vw' }}>
//                   {answerFeedback}
//                 </span>
//               )}
//             </div>
//             <div className="mt-4">
//               {selectedAnswer && (
//                 <button
//                   onClick={handleNextQuestion}
//                   className={`submit-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-7 rounded mt-4 `}
//                 >
//                   Next Question
//                 </button>
//               )}
//             </div>  
//             </center>
            
//             <div className="mt-4">
            
//               <ScoreBar
//                 bgcolor="gray"
//                 completed={calculateScore()}
//                 predictCorrect={predictScoreIfAllCorrect()}
//                 predictWrong={predictScoreIfAllWrong()}
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <div>
//               <h1>Result.</h1>
//               <p>
//                 Your Score: {correctAnswers}/{totalQuestions}
//               </p>
//               <p>
//                 Your percentage: ({calculateScore()}
//                 %)
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Quiz;





import React, { useState, useEffect } from 'react';
import quizData from '../data/quizData.json';
import ProgressBar from '../component/progressBar';
import ScoreBar from '../component/scoreBar';
import Button from '../component/button'; // Import the Button component
const Star = ({ filled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'black' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-star"
      width="16"
      height="16"
      style={{ marginRight: '8px' }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const Quiz = () => {
  const totalQuestions = quizData.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);
  const [answerFeedback, setAnswerFeedback] = useState(null); // State to store answer feedback
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    
    shuffleOptions();
  }, [currentQuestionIndex]);

  const shuffleOptions = () => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < totalQuestions) {
      const correctAnswer = decodeURIComponent(quizData[currentQuestionIndex].correct_answer);
      const incorrectAnswers = quizData[currentQuestionIndex].incorrect_answers.map(answer => decodeURIComponent(answer));
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
      decodeURIComponent(quizData[currentQuestionIndex].correct_answer)
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
    setAnswerFeedback(null); // Reset answer feedback when moving to the next question
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

  const decodedQuestions = quizData
    .map((questionObj, index) => {
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
          options: [...decodedOptions, decodedCorrectAnswer].sort(() => Math.random() - 0.5), // Shuffle options
          correct_answer: decodedCorrectAnswer
        };
      } catch (error) {
        console.error(`Error decoding question ${index}:`, error);
        console.log('Question Object:', questionObj);
        return null;
      }
    })
    .filter(question => question !== null);

  let starCount = 0;
  if (
    decodedQuestions[currentQuestionIndex] &&
    decodedQuestions[currentQuestionIndex].difficulty === 'easy'
  ) {
    starCount = 1;
  } else if (
    decodedQuestions[currentQuestionIndex] &&
    decodedQuestions[currentQuestionIndex].difficulty === 'medium'
  ) {
    starCount = 2;
  } else if (
    decodedQuestions[currentQuestionIndex] &&
    decodedQuestions[currentQuestionIndex].difficulty === 'hard'
  ) {
    starCount = 3;
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setAnswered(0);
    setRemainingQuestions(totalQuestions);
    setAnswerFeedback(null);
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
              <div>
                <br/><br/><br/><br/>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 flex items-center ">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </h1>
                <span>
  {decodedQuestions[currentQuestionIndex]?.category === "Animals" || 
   decodedQuestions[currentQuestionIndex]?.category === "Geography" ||
   decodedQuestions[currentQuestionIndex]?.category === "History" ||
   decodedQuestions[currentQuestionIndex]?.category === "General%20Knowledge" ||
   !decodedQuestions[currentQuestionIndex]?.category ? 
    `Entertainment: ${decodeURIComponent(decodedQuestions[currentQuestionIndex]?.category)}` :
    decodeURIComponent(decodedQuestions[currentQuestionIndex].category)
  }
</span>



                <div className="flex items-center  ">
                  {[...Array(3)].map((_, index) => (
                    <Star key={index} filled={index < starCount} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              {decodeURIComponent(
                quizData[currentQuestionIndex].question
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 justify-center">
              {shuffledOptions.map((answer, index) => (
                <div key={index} className="text-center">
                  <button
                    className={`choice_buttons ${
                      selectedAnswer === answer ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={selectedAnswer !== null}
                    style={{
                      color: selectedAnswer === answer ? 'white' : 'black',
                      backgroundColor:
                        selectedAnswer === answer ? 'black' : 'transparent',
                      width: '70%',
                      padding: '5px',
                      margin:"20px",
                      // gap:'2',
                      border: '1px solid black',
                      borderRadius: '8px'
                    }}
                  >
                    {decodeURIComponent(answer)}
                  </button>
                </div>
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
            </div> </center>
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
          <><div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-4 text-center"> <br/><br/><br/><br/><br/>
            <h1 className="font-bold text-2xl"><b>Result</b></h1>
            <p><b>Your Score:</b> {correctAnswers}/{totalQuestions}</p>
            <p><b>Your Percentage:</b> ({calculateScore()}%)</p>
            <h2 className="font-bold text-xl">
              {calculateScore() < 50 ? 'Sorry, You Failed' : 'Congratulations, You Passed'}
            </h2>
            <div className="mt-4">
              <Button onClick={handleRestart}>Restart Quiz</Button>
            </div>
          </div>
        </div>
        
          
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
