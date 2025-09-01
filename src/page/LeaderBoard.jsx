import React, { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import "../style/LeaderBoard.css";
const LeaderBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    fetchLeaderBoard();
  }, [searchTerm]);

  const fetchLeaderBoard = async () => {
    if (searchTerm.trim() === "") {
      setLeaderBoard([]);
      return;
    }
    const data = await ApiService.searchLeaderBoard(searchTerm);
    setLeaderBoard(data.userTests || []); // <-- match your Response DTO
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>

      <input
        type="text"
        placeholder="Search test..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Test Name</th>
            <th>User</th>
            <th>Score</th>
            <th>Attempted At</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No results found
              </td>
            </tr>
          ) : (
            leaderBoard.map((entry, index) => (
              <tr key={index}>
                <td>
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                </td>
                <td>{entry.testTitle}</td>
                <td>{entry.userName}</td>
                <td>{entry.score}</td>
                <td>{new Date(entry.attemptedAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
