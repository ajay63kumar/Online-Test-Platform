import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import ApiService from "../service/ApiService";
import "../style/userPerformance.css";

const UserPerformance = () => {
  const [username, setUsername] = useState("");
  const [performance, setPerformance] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [stats, setStats] = useState({ total: 0, avg: 0, max: 0 });
  const [error, setError] = useState("");

  const fetchPerformance = async () => {
    if (!username) return;

    try {
      const data = await ApiService.submitUserWhichPerformance(username);
      if (!data || !data.tests) throw new Error("No data");

      setUserInfo(data.user);

      const chartData = data.tests.map((test) => ({
        name: test.name,
        score: test.score,
      }));
      setPerformance(chartData);

      const scores = data.tests.map((t) => t.score);
      const total = scores.length;
      const avg = scores.reduce((a, b) => a + b, 0) / total;
      const max = Math.max(...scores);

      setStats({ total, avg: avg.toFixed(2), max });
      setError("");
    } catch (err) {
      console.error("Error fetching performance:", err);
      setError("❌ Failed to fetch performance. Check username/email.");
      setPerformance([]);
      setUserInfo(null);
      setStats({ total: 0, avg: 0, max: 0 });
    }
  };

  const getBarColor = (score) => {
    if (score < 50) return "#ef4444"; // red
    if (score < 80) return "#facc15"; // yellow
    return "#22c55e"; // green
  };

  return (
    <div className="user-performance-container">
      <h2>📊 User Performance Dashboard</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchPerformance} className="fetch-btn">
          Fetch
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {userInfo && (
        <div className="user-info">
          <h3>
            {userInfo.name} ({userInfo.email}) - Role: {userInfo.role}
          </h3>

          <div className="stats-cards">
            <div className="stats-card">
              <p className="label">Total Tests</p>
              <p className="value">{stats.total}</p>
            </div>
            <div className="stats-card">
              <p className="label">Average Score</p>
              <p className="value">{stats.avg}</p>
            </div>
            <div className="stats-card">
              <p className="label">Highest Score</p>
              <p className="value">{stats.max}</p>
            </div>
          </div>
        </div>
      )}

      {performance.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={performance}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />

              {/* Average line */}
              <ReferenceLine
                y={stats.avg}
                stroke="#6366f1"
                strokeDasharray="5 5"
                label={{
                  value: `Avg: ${stats.avg}`,
                  position: "top",
                  fill: "#6366f1",
                }}
              />

              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {performance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default UserPerformance;
