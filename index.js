const express = require("express");
const db = require("./config/db");
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});