const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;

app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Hardcoded username and password
const username = "admin";
const password = "admin";

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/login", (req, res) => {
  if (req.body.username === username && req.body.password === password) {
    res.status(200).send("Login successful!");
  } else {
    res.status(401).send("Incorrect username or password");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
