import axios from "../axiosInstance.js";
import React, { useEffect, useState } from "react";
import getFormattedDate from "../utils/formatting.js";
import sortByLastLogin from "../utils/sort.js";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [succesfulMsg, setSuccesfulMsg] = useState("");
  const currentUserEmail = window.sessionStorage.getItem("email");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/users", {
        headers: { email: currentUserEmail },
      })
      .then((res) => {
        const sortedData = sortByLastLogin(res.data);
        setUsers(sortedData);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = "/";
        }
      });
  };

  const handleCheckboxChange = (userEmail) => {
    if (selectedUsers.includes(userEmail)) {
      setSelectedUsers(selectedUsers.filter((email) => email !== userEmail));
    } else {
      setSelectedUsers([...selectedUsers, userEmail]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.email));
    }
    setSelectAll(!selectAll);
  };

  const handleAction = (action) => {
    if (selectedUsers.length === 0) {
      return;
    }

    let endpoint = "/users/" + action;

    axios
      .post(
        endpoint,
        { emails: selectedUsers },
        { headers: { email: currentUserEmail } }
      )
      .then((res) => {
        if (
          action === "block" &&
          selectedUsers.length === users.length &&
          selectedUsers.includes(currentUserEmail)
        ) {
          window.location.href = "/";
        }

        setSuccesfulMsg(`You successfully ${action} user!`);
        setTimeout(() => {
          setSuccesfulMsg("");
        }, 3000);
        fetchUsers();
        setSelectedUsers([]);
        setSelectAll(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = "/";
        }
      });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light">
        <div className="d-flex">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handleAction("block")}>
            <i className="bi bi-lock-fill"></i> Block
          </button>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handleAction("unblock")}>
            <i className="bi bi-unlock-fill"></i>
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleAction("delete")}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
        <div>
          <input type="text" className="form-control" placeholder="Filter" />
        </div>
      </div>

      {succesfulMsg && (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Well done!</h4>
          <p>{succesfulMsg}</p>
        </div>
      )}

      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.email}
              className={
                user.status === "Blocked" ? "text-decoration-line-through" : ""
              }>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.email)}
                  onChange={() => handleCheckboxChange(user.email)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td title={user.last_login}>
                {getFormattedDate(user.last_login)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
