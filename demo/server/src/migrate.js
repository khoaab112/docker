const { connectDB } = require("./db");

async function migrate() {
    const db = await connectDB();

    await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    const [rows] = await db.execute("SELECT COUNT(*) AS c FROM users");
    if (rows[0].c === 0) {
        await db.execute(`
      INSERT INTO users (name) VALUES ('Khoa đẹp trai'), ('ChatGPT ngầu')
    `);
    }
}

module.exports = { migrate };