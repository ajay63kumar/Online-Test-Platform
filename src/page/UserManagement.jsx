
import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import "../style/user.css"; // import custom css file

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllUsers();
      const userArray = Array.isArray(data) ? data : data.users || [];
      setUsers(userArray);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await ApiService.deleteUser(id);
        loadUsers();
      } catch {
        setError("❌ Failed to delete user.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = async () => {
    try {
      await ApiService.updateUser(editingUser, formData);
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "" });
      loadUsers();
    } catch {
      setError("❌ Failed to update user.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-container">
      <h1 className="user-title">👥 User Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name, email or role..."
        className="user-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Error Message */}
      {error && <p className="user-error">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p className="user-loading">⏳ Loading users...</p>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-users">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form */}
      {editingUser && (
        <div className="edit-form">
          <h2>✏️ Edit User</h2>
          <input
            type="text"
            className="form-input"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <select
            className="form-input"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="btn-save" onClick={handleUpdate}>
            ✅ Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

