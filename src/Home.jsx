import React from "react";
import { IoSend } from "react-icons/io5";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <header className="header">
        <nav className="navbar">
          <div className="logo">Logo</div>
          <ul className="nav-links">
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hero">
          <h1>Make your Trello tables faster with Nav AI</h1>
          <p>What to get started? First log into your Trello account</p>
          <button className="button" onClick={() => navigate('/login')}>Log in Trello</button>
        </div>
      </header>
      <section className="subscription">
        <h2>Nav AI</h2>
        <p>
          In the meantime, Sign up for our monthly newsletter to stay up to
          date.
        </p>
        <div className="input-container">
          <input type="text" placeholder="Text your prompt" />
          <button className="button">
            <IoSend />
          </button>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-card">
          <h3>Personal</h3>
          <p className="price">
            $12 <span>p/month</span>
          </p>
          <ul>
            <li>✅ Create tables and workplaces</li>
            <li>✅ Create tables and workplaces</li>
          </ul>
          <button className="button">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
