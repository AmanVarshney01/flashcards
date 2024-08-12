import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql, { ResultSetHeader } from "mysql2/promise";
dotenv.config();

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/flashcards", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM flashcards");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching flashcards", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/flashcards", async (req, res) => {
  try {
    const { question, description, answer, language, code } = req.body;
    await pool.query<ResultSetHeader>(
      "INSERT INTO flashcards (question, description, answer, language, code) VALUES (?, ?, ?, ?, ?)",
      [question, description, answer, language, code]
    );
    res.status(201).json({ message: "Flashcard created successfully" });
  } catch (error) {
    console.error("Error creating flashcard", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, description, answer, language, code } = req.body;
    await pool.query(
      "UPDATE flashcards SET question = ?, description = ?, answer = ?, language = ?, code = ? WHERE id = ?",
      [question, description, answer, language, code, id]
    );
    res.status(204).json({ message: "Flashcard updated successfully" });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Error updating flashcard" });
  }
});

app.delete("/api/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM flashcards WHERE id = ?", [id]);
    res.status(200).json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Error deleting flashcard" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
