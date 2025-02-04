// api/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Middleware for JSON data

// Simple API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
