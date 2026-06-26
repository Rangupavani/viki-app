import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const email = formData.email.toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === formData.password
    );

    if (!foundUser) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(foundUser)
    );

    alert("Login successful.");

    navigate("/dramas");
  }

  return (
    <main className="auth-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>
      </form>

      <p className="auth-link">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}

export default Login;