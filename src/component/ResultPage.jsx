// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/result.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, results, testName } = location.state || {};

  if (!results) {
    return <p>No results available. Please take a test first.</p>;
  }

  return (
    <div className="result-page">
      <h1>Test Result</h1>
      <h2>{testName}</h2>
      <p>
        Score: <strong>{score}</strong> / {total}
      </p>

      <div className="result-details">
        <h3>Review</h3>
        <ol>
          {results.map((r, index) => (
            <li key={index} className={r.isCorrect ? "correct" : "wrong"}>
              <p>{r.question}</p>
              <p>Your Answer: {r.userAnswer || "Not Answered"}</p>
              <p>Correct Answer: {r.correctAnswer}</p>
            </li>
          ))}
        </ol>
      </div>

      <button className="back-btn" onClick={() => navigate("/homepage")}>
        Back to Home
      </button>
    </div>
  );
};

export default ResultPage;
