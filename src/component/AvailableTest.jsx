import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../service/ApiService";
import "../style/test.css";

const AvailableTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAllTests();
       console.log(response.data+" ------------")
      if (response.status === 200) {
        setTests(response.tests || []);
       
      } else {
        setMessage(response.message || "Failed to load tests");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching tests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="available-tests">
      <h1>📝 Available Tests</h1>

      {message && <p className="text-red-400">{message}</p>}

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p>No tests found</p>
      ) : (
        <div className="test-list">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h3>{test.name}</h3>
              <p>
                  
                <strong>Subject:</strong> {test.subject.subject || "-"}
              </p>
              <p>
                <strong>Duration:</strong> {test.durationMin} min
              </p>
              <p>
                <strong>Total Questions:</strong> {test.totalQuestions}
              </p>
             <span className={`status-badge ${test.status === "ACTIVE" ? "status-active" : "status-inactive"}`}>
  {test.status}
</span>

              <Link to={`/onlinetest/${test.id}`} className="start-test-btn">
                Start Test
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTest;

