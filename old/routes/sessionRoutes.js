const express = require("express");
const bcrypt = require("bcryptjs");
const requireSessionAuth = ("../middleware/requireSessionAuth");

const router = express.Router();
const users = [];

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const exists = users.find(user => user.username === username);

    if (exists) {
        return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {id: Date.now().toString(), username, password: hashedPassword};
    users.push(user);
    res.status(201).json({message: "User registered successfully", user});
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    req.session.user = { id: user.id, username: user.username };
    res.json({ message: "Login successful", user: req.session.user });
});

router.get("/profile", requireSessionAuth, (req, res) => {
    res.json({ user: req.session.user });
});

router.post("/logout", requireSessionAuth, (req, res) => {
    req.session.destroy((err)=>{
        if (err) {
            return res.status(500).json({ error: "Failed to logout" });
        }
        res.clearCookie("sid");
        res.json({ message: "Logged out successfully" });
    });
});