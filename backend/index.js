// api/index.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// API endpoint to send email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Simple API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend Jobayed!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


