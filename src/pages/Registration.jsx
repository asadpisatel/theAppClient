import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Registration() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function hanldeSubmit(e) {
    e.preventDefault();

    setErrorMessage("");
    try {
      await axios.post("/register", values);
      window.sessionStorage.setItem("email", values.email);

      navigate("/admin-panel");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("Email is already registered.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }
  return (
    <div className="d-flex align-items-center vh-100">
      <div style={{ maxWidth: "350px" }} className="m-auto w-100">
        <h2>Sign Up</h2>
        <form onSubmit={hanldeSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              required
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />{" "}
            {errorMessage && (
              <small id="emailHelp" className="form-text text-danger">
                {errorMessage}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
