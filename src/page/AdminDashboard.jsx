
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../style/Dashboard.css";
import SubjectPage from "../component/SubjectPage";
import TestPage from "../component/TestPage";
import UserManagement from "./UserManagement";
import AdminDash from "./AdminDash";


const Settings = () => <h2>⚙️ Settings Page</h2>;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "❮" : "❯"}
          </button>
        </div>
        <ul className="menu">
          <li><Link to="/admin">🏠 Dashboard</Link></li>
          <li><Link to="/admin/users">👨‍🎓 Manage Users</Link></li>
          <li><Link to="/admin/tests">📝 Manage Tests</Link></li>
          <li><Link to="/admin/subjects">📚 Manage Subjects</Link></li>
          <li><Link to="/admin/settings">⚙️ Settings</Link></li>
          <li><Link to="/homepage">back to home</Link></li>
        </ul>


      </aside>

      {/* Main Content */}
      <main className="content">
       

        <section className="main-section">
          <Routes>
            <Route path="/" element={<AdminDash />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/tests" element={<TestPage />} />
            <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </section>
      </main>
      
    </div>
  );
};

export default AdminDashboard;


