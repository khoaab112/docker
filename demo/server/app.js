const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Node.js5 f!6 4tyu d ');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});