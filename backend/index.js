const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// API Route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Export the app for Render
module.exports = app;

// Only listen on port in local environment, not on Render
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
