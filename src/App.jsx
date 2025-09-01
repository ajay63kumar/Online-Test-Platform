
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectPage from "./component/SubjectPage";
import TestPage from "./component/TestPage";
import AvailableTest from "./component/AvailableTest";
import OnlineTest from "./component/OnlineTest";
import ResultPage from "./component/ResultPage";
import RegisterPage from "./component/RegisterPage";
import LoginPage from "./component/LoginPage";
import HomePage from "./component/HomePage";
import ProfilePage from "./component/ProfilePage";
import AdminDashboard from "./page/AdminDashboard";
import TeacherDashboard from "./page/TeacherDashboard";
import LeaderBoard from "./page/LeaderBoard";
import UserManagement from "./page/UserManagement";
import { ProtectedRoute, AdminRoute, TeacherRoute, ManageRoute } from "./service/Guard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />

        {/* Protected pages (any authenticated user) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <SubjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tests"
          element={
            <ProtectedRoute>
              <TestPage />
            </ProtectedRoute>
          }
        />

        {/* Available tests (both Admin and Teacher can view/manage) */}
        <Route
          path="/availabletests"
          element={
            <ProtectedRoute >
              <AvailableTest />
            </ProtectedRoute>
          }
        />

        {/* Online test accessible to authenticated users */}
        <Route
          path="/onlinetest/:id"
          element={
            <ProtectedRoute>
              <OnlineTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />

        {/* Admin only pages */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Teacher only pages */}
        <Route
          path="/teacher/*"
          element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          }
        />

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<div>🚫 You are not authorized to view this page.</div>} />

        {/* Catch-all fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;




