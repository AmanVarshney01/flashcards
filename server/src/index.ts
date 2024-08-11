import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql, { ResultSetHeader } from "mysql2/promise";
dotenv.config();

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function getFlashCards() {
  const [rows] = await pool.query("SELECT * FROM flashcards");
  return rows;
}

getFlashCards().then((result) => {
  console.log(result);
});

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/flashcards", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM flashcards");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching flashcards", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/flashcards", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO flashcards (question, answer) VALUES (?, ?)",
      [question, answer]
    );
    res.status(201).json({ id: result.insertId, question, answer });
  } catch (error) {
    console.error("Error creating flashcard", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    await pool.query(
      "UPDATE flashcards SET question = ?, answer = ? WHERE id = ?",
      [question, answer, id]
    );
    res.json({ message: "Flashcard updated successfully" });
  } catch (error) {
    console.error("Error updating flashcard:", error);
    res.status(500).json({ error: "Error updating flashcard" });
  }
});

app.delete("/api/flashcards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM flashcards WHERE id = ?", [id]);
    res.json({ message: "Flashcard deleted successfully" });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Error deleting flashcard" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
