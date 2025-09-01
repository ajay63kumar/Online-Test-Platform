import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "../style/onlinetest.css";

const OnlineTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds

  useEffect(() => {
    if (id) loadTest(id);
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Auto-submit when timer reaches 0
    if (timeLeft === 0 && test) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft, test]);

  const loadTest = async (testId) => {
    try {
      setLoading(true);
      const response = await ApiService.getTestById(testId);
      if (response.status === 200) {
        setTest(response.test || response.data?.test);
        setTimeLeft((response.test.durationMin || 15) * 60); // convert minutes to seconds
      } else {
        setMessage(response.message || "Failed to load test");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching test");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (!test?.questions) return;

    let score = 0;
    const total = test.questions.length;

    const results = test.questions.map((q) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    try {
      await ApiService.submitTest(test.id, score); // save test attempt in backend
      navigate("/result", {
        state: { score, total, results, testName: test.title },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting test");
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  if (loading) return <p>Loading test...</p>;
  if (!test) return <p>{message || "Test not found"}</p>;

  return (
    <div className="exam-container">
      <h1>{test.title}</h1>
      <p className="sub-title">Duration: {test.durationMin} minutes</p>
      <p className="sub-title">Status: {test.status}</p>

    <div className="timer-bar-container">
  <div
    className="timer-bar-fill"
    style={{ width: `${(timeLeft / (test.durationMin * 60)) * 100}%` }}
  ></div>
</div>
<p className="timer">Time Left: {formatTime(timeLeft)}</p>

      <h3>Questions</h3>
      <ol className="exam-questions">
        {test.questions?.map((q, index) => (
          <li key={q.id}>
            <p className="question-title">
              <span className="question-number">{index + 1}. </span>
              {q.question}
            </p>
            <ul className="options">
              {q.options?.map((opt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionChange(q.id, opt)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default OnlineTest;
