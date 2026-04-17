const express = require("express");
const db = require("./config/db");

const app = express();
const port = 3000;

app.use(express.json());

// mysql connection



// In memory data
let students = [
  {id: 1, name: "Samuel"},
  {id: 2, name: "John"},
];

// Fetching all students
app.get("/", (req, res) => {
  res.json(students);
});

// Fetching a specific student
app.get("/student/:id/school/:name", (req, res) => {
  const { id, name } = req.params;
  const student = students.find(s => s.id === parseInt(id) && s.school === name);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

// Create students
app.post("/student", (req, res) => {
  const { name, school } = req.body;
  const newStudent = { id: students.length + 1, name, school };
  students.push(newStudent);
  res.status(200).json(newStudent);
});

// Update student
app.put("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.map(s => s.id === id ? { ...s, ...req.body } : s);
  res.status(200).json({message: "Student updated successfully"});
});

// Delete student
app.delete("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.status(200).json({message: "Deleted students successfully",students: students});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});