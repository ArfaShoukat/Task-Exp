
import React from "react";

const ScoreBar = ({ completed, predictWrong, predictCorrect }) => {
  const predictWrongWidth = predictWrong;
  const remainingSpace = 100 - completed;
  const additionalCorrect = predictCorrect - completed; //
  const predictCorrectWidth =
    additionalCorrect > remainingSpace ? remainingSpace : additionalCorrect;

  return (
    <div
      style={{
        padding: "2vw",
        position: "absolute",
        top: "80%",
        left: "23%",
        width: "50%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.5rem",
        }}
      >
        <div>Score: {predictWrong}%</div>
        <div>Max Score: {predictCorrect}%</div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "4vh",
          border: "2px solid black",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${predictWrongWidth}%`,
            height: "100%",
            backgroundColor: "black",
            zIndex: 100,
            color: "white",
             transition: "width .5s linear",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            left: 0,
            width: `${completed}%`,
            height: "100%",
            backgroundColor: "gray",
            zIndex: 3,
             transition: "width .5s linear",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            left: `${completed}%`,
            width: `${predictCorrectWidth}%`,
            height: "100%",
            backgroundColor: "lightgray",
            zIndex: 2,
             transition: "width .5s linear",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreBar;