const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock users (later can be in users.json)
const users = [{ username: "admin", password: "1234" }];

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));