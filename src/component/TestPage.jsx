import React, { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import "../style/testmanage.css";

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null); 
  const [message, setMessage] = useState("");

  // Form states
  const [testId, setTestId] = useState(null);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [durationMin, setDurationMin] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);


const [subjects, setSubjects] = useState([]); // store all subjects

// load subjects
const loadSubjects = async () => {
  try {
    const response = await ApiService.getAllSubjects();
    if (response.status === 200) setSubjects(response.subjects || []);
  } catch (error) {
    showMessage(error.response?.data?.message || "Error fetching subjects");
  }
};

useEffect(() => {
  loadTests();
  loadSubjects(); // also load subjects when page loads
}, []);


 const showMessage = (msg, time = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), time);
  };

  const loadTests = async () => {
    try {
      const response = await ApiService.getAllTests();
      if (response.status === 200) setTests(response.tests || []);
    } catch (error) {
      showMessage(error.response?.data?.message || "Error fetching tests");
    }
  };

  const resetForm = () => {
    setTestId(null);
    setTitle("");
    setSubjectId("");
    setDurationMin("");
    setStatus("ACTIVE");
    setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  // Add/Update test
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { id: testId, name: title, subject: { id: subjectId }, durationMin, status, questions };

    try {
      if (testId) {
        await ApiService.updateTest(testId, payload);
        showMessage("✏️ Test updated successfully");
      } else {
        await ApiService.addTest(payload);
        showMessage("✅ Test added successfully");
      }
      resetForm();
      loadTests();
    } catch (error) {
      showMessage(error.response?.data?.message || "Error saving test");
    }
  };

  // Load test data into form for updating
  const handleEdit = (test) => {
    setTestId(test.id);
    setTitle(test.name);
    setSubjectId(test.subject.id);
    setDurationMin(test.durationMin);
    setStatus(test.status);
    setQuestions(test.questions.length ? test.questions : [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    setSelectedApi("add"); // open form
  };

  // Delete test
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      await ApiService.deleteTest(id);
      showMessage("❌ Test deleted successfully");
      loadTests();
    } catch (error) {
      showMessage(error.response?.data?.message || "Error deleting test");
    }
  };



  // Question handlers
  const addQuestion = () => setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  return (
    <div className="test-page">
      <h1 className="test-heading">📋 Test Management</h1>
      {message && <div className="test-message">{message}</div>}

      {/* API Cards */}
      <div className="api-cards">
        <div className="api-card" onClick={() => setSelectedApi("getAll")}>📜 Get All Tests</div>
        <div className="api-card" onClick={() => { resetForm(); setSelectedApi("add"); }}>➕ Add Test</div>
        
      </div>

      {/* API Functionalities */}
      <div className="api-functionality">
        {selectedApi === "getAll" && (
          <div>
            <h3>All Tests</h3>
            <div className="test-cards">
              {tests.map((t) => (
                <div key={t.id} className="test-card">
                  <h4>{t.name}</h4>
                  <p>📘 Subject: {t.subject.subject}</p>
                  <p>⏱ Duration: {t.durationMin} min</p>
                  <div className="test-card-buttons">
                    <button onClick={() => handleEdit(t)} className="btn-primary">✏️ Update</button>
                    <button onClick={() => handleDelete(t.id)} className="btn-danger">❌ Delete</button>

            
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

</div>       
  {selectedApi === "add" && (
         <form className="test-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Test Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="test-input" />

             <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required className="test-input">
              <option value="">Select a subject</option>
          {subjects.map((s) => (
     <option key={s.id} value={s.id}>{s.subject}</option>
         ))}
      </select>

             <input type="number" placeholder="Duration (min)" value={durationMin} onChange={(e) => setDurationMin(e.target.value)} required className="test-input" />

   

            <h3>Questions</h3>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-block">
                <input type="text" placeholder="Question" value={q.question} onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)} className="test-input" required />
                {q.options.map((opt, optIndex) => (
                  <input key={optIndex} type="text" placeholder={`Option ${optIndex + 1}`} value={opt} onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)} className="test-input" required />
                ))}
                <input type="text" placeholder="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)} className="test-input" required />
              </div>
            ))}
            <button type="button" onClick={addQuestion} className="btn-secondary">➕ Add Question</button>

            <select value={status} onChange={(e) => setStatus(e.target.value)} className="test-input">
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>

            <div className="test-buttons">
              <button type="submit" className="btn-primary">{testId ? "✏️ Update Test" : "➕ Add Test"}</button>
              <button type="button" onClick={resetForm} className="btn-secondary">Reset</button>
            </div>
          </form>
        )}
      </div>
  )
};

export default TestPage;



