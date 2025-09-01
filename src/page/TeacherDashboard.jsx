

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../style/Dashboard.css";
import TestPage from "../component/TestPage";
import UserPerformance from "./UserPerformace";
import HomePage from "../component/HomePage";

const TeacherHome = () => <h2>👩‍🏫 Welcome to Teacher Dashboard</h2>;
const TeacherSettings = () => <h2>⚙️ Teacher Settings</h2>;

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Teacher</h2>
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>
        <ul className="menu">
          <li><Link to="">🏠 Dashboard</Link></li>
          <li><Link to="/teacher/create-questions">✍️ Create Questions</Link></li>
          <li><Link to="/teacher/performace-analyer">📑 User Performance</Link></li>
          <li><Link to="/teacher/settings">⚙️ Settings</Link></li>
          <li><Link to="/homepage">🔙 Back to Home</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <section className="main-section">
          <Routes>
       <Route index element={<TeacherHome />} /> {/* default at /teacher */}
            <Route path="/create-questions" element={<TestPage />} />
            <Route path="/performace-analyer" element={<UserPerformance />} />
            <Route path="/settings" element={<TeacherSettings />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
