const express = require("express");
const { connectDB } = require("./db");

const router = express.Router();

router.get("/users", async(req, res) => {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
});

module.exports = router;