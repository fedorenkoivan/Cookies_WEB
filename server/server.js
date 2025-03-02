const API_KEY = "37444471718e5a12748cee2b6c801bc1";
const TRELLO_SECRET =
  "90c042d9b09656cf9921b085bc31b399d440ca48014b89acb1487f939cab940b";
const TRELLO_TOKEN =
  "ATTA2813fffd2cc79b31fb478b10aa503b7c7ace94526d0da0e07c92bc6e17dc11c3AB977CCE";

const JWT_SECRET = "12345687654334567809876543223568545";

import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/trello/board", async (req, res) => {
  try {
    const { name } = req.body;
    const response = await axios.post(
      `https://api.trello.com/1/boards/?name=${name}&key=${API_KEY}&token=${TRELLO_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/trello/list", async (req, res) => {
  try {
    const { name, boardId } = req.body;
    const response = await axios.post(
      `https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${API_KEY}&token=${TRELLO_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/trello/card", async (req, res) => {
  try {
    const { name, listId } = req.body;
    const response = await axios.post(
      `https://api.trello.com/1/cards?name=${name}&idList=${listId}&key=${API_KEY}&token=${TRELLO_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const db = new sqlite3.Database("users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to the SQLite database.");
});

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT, trello_token TEXT)"
);

app.post("/register", async (req, res) => {
  const { email, password, trello_token } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO users (email, password, trello_token) VALUES (?, ?, ?)",
    [email, hashedPassword, trello_token],
    (err) => {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.json({ message: "User registered successfully" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, trello_token: user.trello_token });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
