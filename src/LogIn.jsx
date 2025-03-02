import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("trello_token", response.data.trello_token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
      <button onClick={loginUser} className="submit-button">Login</button>
    </div>
  );
}
