const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { migrate } = require("./migrate");
// require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
console.log("PORT =", process.env.SERVER_PORT);
app.use(cors({
    origin: "*"
}));

async function startServer() {
    await migrate();

    app.use(express.json());
    app.use("/api", routes);

    app.listen(PORT, () => {
        console.log("Server đang chạy ở port  :" + PORT);
    });
}

startServer();