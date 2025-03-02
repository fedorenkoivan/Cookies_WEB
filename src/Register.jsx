import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trelloToken, setTrelloToken] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
        trello_token: trelloToken,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + error.response.data.error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Trello Token"
        value={trelloToken}
        onChange={(e) => setTrelloToken(e.target.value)}
        className="input-field"
      />
      <button onClick={registerUser} className="submit-button">
        Register
      </button>
    </div>
  );
};
