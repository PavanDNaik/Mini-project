const express = require("express");
const app = express();
const port = 5000;
const connectDb = require("./db/dbConnect");
const User = require("./db/user");
const cors = require("cors");
connectDb();

app.use(express.json());
app.use(cors());

// regis
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    response.status(500).json({ error: "FAILED" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    return res.status(200).json({ success: true, message: "Login Successful" });
  } catch (error) {
    return res.status(500).json({ error: "Login Failed" });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Server is running in port 5000");
});
