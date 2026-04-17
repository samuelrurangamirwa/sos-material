const db = require("../config/db");

exports.getUsers = (req,res) => {
    const sql = "SELECT * FROM users";

    db.query(sql,(err,result)=>{
        if (err) res.status(400).json(err);
        res.status(200).json(result)
    });
};

exports.createUser = (req,res) => {
    const {username,email,role,password} = req.body;
    const sql = "INSERT INTO users (username, email,role, password) VALUES (?, ?, ?)";

    if (!username || !email || !role || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const hashPassword = bcrypt.hash(password);

    db.query(sql,[username,email,role,hashPassword],(err,result)=>{
        if (err) res.status(500).json(err);
        res.status(201).json({ message: "User created successfully", user: result });
    });
};

exports.deleteUser = (req,res) => {
    const {id} = req.params;
    const sql = "DELETE FROM users WHERE user_id = ?";

    if (id) res.status(400).json("No id found");
    db.query(sql,[id],(err,result)=>{
        if (err) res.status(500).json(err);
        res.status(200).json({message: "User deleted successfully."})
    });
}