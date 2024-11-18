const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/tacos", (req, res) => {
  res.send("get / tacos");
});

app.post("/tacos", (req, res) => {
  const { username, password } = req.body;

  res.send(`Hey ${username} your password is ${password}`);
});

app.listen(3000, () => {
  console.log("on port 3000");
});
