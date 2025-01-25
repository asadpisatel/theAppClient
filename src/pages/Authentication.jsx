import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Authentication() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post("/login", values);
      window.sessionStorage.setItem("email", values.email);
      navigate("/admin-panel");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="d-flex align-items-center vh-100">
      <div style={{ maxWidth: "350px" }} className="m-auto w-100">
        <div className="d-flex justify-content-end">
          <Link className="btn btn-info mb-5" to="/registration">
            Sign Up
          </Link>
        </div>

        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            />
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
            {errorMessage && (
              <small id="emailHelp" className="form-text text-danger">
                {errorMessage}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
