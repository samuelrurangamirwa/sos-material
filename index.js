const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();

require("./config/db");

const PORT = 3000;

// Middleware
app.use(express.json());

// User Routes
app.use("/api/user",userRoutes);

// Employee Routes

app.get("/",(req,res)=>{
    res.send("Server is running!")
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});