
import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import "../style/subject.css";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState(null); // ✅ consistent naming

  const fetchSubjects = async () => {
    try {
      const response = await ApiService.getAllSubjects();
      console.log('Subjects response:', response);

      if (response.status === 200) {
        setSubjects(response.subjects); // Make sure your backend returns { subjects: [...] }
      }
    } catch (error) {
      showMessage(error.response?.data?.message || `Error fetching subjects: ${error}`);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const addSubject = async () => {
    if (!subjectName.trim()) {
      showMessage('Subject name cannot be empty');
      return;
    }
    try {
      await ApiService.addSubject({ subject: subjectName });
      showMessage('Subject successfully added');
      setSubjectName('');
      fetchSubjects();
    } catch (error) {
      showMessage(error.response?.data?.message || `Error adding subject: ${error}`);
    }
  };

  const editSubject = async () => {
    try {
      await ApiService.updateSubject(editingSubjectId, { subject: subjectName });
      showMessage('Subject successfully updated');
      setIsEditing(false);
      setSubjectName('');
      setEditingSubjectId(null);
      fetchSubjects();
    } catch (error) {
      showMessage(error.response?.data?.message || `Error updating subject: ${error}`);
    }
  };

  const handleEditSubject = (sub) => {
    setIsEditing(true);
    setEditingSubjectId(sub.id);
    setSubjectName(sub.name);
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await ApiService.deleteSubject(subjectId);
        showMessage('Subject successfully deleted');
        fetchSubjects();
      } catch (error) {
        showMessage(error.response?.data?.message || `Error deleting subject: ${error}`);
      }
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div className='subject-page'>
      {message && (
        <div className='message' style={{ color: 'green', marginBottom: '10px' }}>
          {message}
        </div>
      )}

      <div className='subject-header'>
        <h1>Subjects</h1>
        <div className='add-cat'>
          <input
            type='text'
            placeholder='Subject Name'
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          {!isEditing ? (
            <button type='button' onClick={addSubject}>Add Subject</button>
          ) : (
            <button type='button' onClick={editSubject}>Update Subject</button>
          )}
        </div>
      </div>

      {subjects.length > 0 ? (
        <ul className='subject-list'>
          {subjects.map((subjectvalue) => (
            <li className='subject-item' key={subjectvalue.id}>
              <div className='subject-card'>
              <span >{subjectvalue.subject}</span>
              <div className='subject-actions'>
                <button className='subject-btn' onClick={() => handleEditSubject(subjectvalue)}>Edit</button>
                <button className='subject-btn' onClick={() => handleDeleteSubject(subjectvalue.id)}>Delete</button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subject found.</p>
      )}
    </div>
  );
};

export default SubjectPage;


