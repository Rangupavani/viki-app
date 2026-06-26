import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const adminEmails = [
    "pinkyowner@gmail.com",
    "team1@gmail.com",
    "team2@gmail.com"
  ];

  const [formData, setFormData] = useState({
    name: "",
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

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("User already exists. Please login.");
      navigate("/login");
      return;
    }

    const role = adminEmails.includes(email)
      ? "admin"
      : "user";

    const newUser = {
      ...formData,
      email: email,
      role: role
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful. Please login.");

    navigate("/login");
  }

  return (
    <main className="auth-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          Register
        </button>
      </form>

      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

export default Register;