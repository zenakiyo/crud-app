const express = require("express");
const app = express();

app.get("/tacos", (req, res) => {
  res.send("get / tacos");
});

app.listen(3000, () => {
  console.log("on port 3000");
});
