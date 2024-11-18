const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const comments = [
  { id: 1, username: "todd", comment: "lol that is so funny" },
  {
    id: 2,
    username: "Skyl3r",
    comment: "I like to go birdwatching with my dog",
  },
  { id: 3, username: "gigboi", comment: "I have seen bigger melons" },
  { id: 4, username: "onlysaywoof", comment: "woof woof woof" },
];

app.get("/comments", (req, res) => {
  res.render("comments/index.ejs", { comments });
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === parseInt(id));
  res.render("comments/show.ejs", { comment });
});

app.get("/comment/new", (req, res) => {
  res.render("comments/new.ejs");
});

app.post("/comment/new", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment });
  res.redirect("/comments");
});

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
