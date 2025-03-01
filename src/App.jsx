import React from "react";
import { IoSend } from "react-icons/io5";
import "./App.css";

const App = () => {
  return (
    <div className="wrapper">
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">Fromer</div>
          <ul className="nav-links">
            <li>Product ▼</li>
            <li>Resources ▼</li>
            <li>Community ▼</li>
            <li>Changelog</li>
            <li>Pricing</li>
          </ul>
        </nav>
        <div className="hero">
          <h1>Make your Trello tables faster with Nav AI</h1>
          <p>What to get started? First log into your Trello account</p>
          <button className="button">Log in Trello</button>
        </div>
      </header>

      {/* Subscription Section */}
      <section className="subscription">
        <h2>Nav AI</h2>
        <p>In the meantime, Sign up for our monthly newsletter to stay up to date.</p>
        <div className="input-container">
          <input type="text" placeholder="Text your prompt" />
          <button className="button">
            <IoSend />
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="pricing-card">
          <h3>Personal</h3>
          <p className="price">$12 <span>p/month</span></p>
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

export default App;
