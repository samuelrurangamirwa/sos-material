require('dotenv').config()
const express = require("express");
const db = require("./config/db");
const cors = require("cors")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3076;

const allowedOrigin = [
  "http://localhost:3076",
  "http://localhost:5173"
];

// CORS Restriction (Package)

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Session

app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// Manual CORS Restriction (Without Package)

// app.use((req, res, next)=>{
//   res.header("Access-Control-Allow-Origin", allowedOrigin);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(express.json());

// Create a record
app.post("/user", (req, res) => {
  console.log(req.body);
  const { fullname, username, age, gender } = req.body;
  
  // Insert into database
  db.query('INSERT INTO users(fullname, username, age, gender) VALUES (?, ?, ?, ?)', 
    [fullname, username, age, gender], 
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId, fullname, username, age, gender });
    });
});

app.get("/users",(req,res)=>{
  db.query("SELECT * FROM users",(err,result)=>{
    if (err) throw err;
    res.status(200).json(result);
  })
});

app.delete("/user/:id",(req,res)=>{
  db.query("DELETE FROM users WHERE id=?",[req.params.id],(err,result)=>{
    if (err) throw err;
    res.status(200).json(result);
  })
});

app.put("/user/:id", (req, res) => {
  const { fullname, username, age, gender } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET fullname = ?, username = ?, age = ?, gender = ? WHERE id = ?",
    [fullname, username, age, gender, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ id, fullname, username, age, gender });
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
