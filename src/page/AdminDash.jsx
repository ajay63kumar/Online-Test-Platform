import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "../style/admindash.css";

// ✅ Icons
import { FaUsers, FaChalkboardTeacher, FaBookOpen, FaClipboardList } from "react-icons/fa";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    teachers: 0,
    tests: 0,
    subjects: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const normalizeResponse = (res, key) => {
    return Array.isArray(res) ? res : res?.[key] || [];
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const resUsers = await ApiService.getAllUsers();
        const users = normalizeResponse(resUsers, "users");
        const teachers = users.filter((u) => u.role === "TEACHER").length;

        const resTests = await ApiService.getAllTests();
        const tests = normalizeResponse(resTests, "tests");

        const resSubjects = await ApiService.getAllSubjects();
        const subjects = normalizeResponse(resSubjects, "subjects");

        setCounts({
          users: users.length,
          teachers,
          tests: tests.length,
          subjects: subjects.length,
        });
      } catch (error) {
        console.error("❌ Error fetching admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card user-card" >
          <FaUsers className="card-icon" />
          <h2>{counts.users}</h2>
          <p>Total Users</p>
        </div>
        <div className="card teacher-card" >
          <FaChalkboardTeacher className="card-icon" />
          <h2>{counts.teachers}</h2>
          <p>Total Teachers</p>
        </div>
        
        <div className="card test-card" onClick={() => navigate("/tests")}>
          <FaClipboardList className="card-icon" />
          <h2>{counts.tests}</h2>
          <p>Total Tests</p>
        </div>
        <div className="card subject-card" onClick={() => navigate("/subjects")}>
          <FaBookOpen className="card-icon" />
          <h2>{counts.subjects}</h2>
          <p>Total Subjects</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;


