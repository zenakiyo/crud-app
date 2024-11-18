const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  { id: uuidv4(), username: "todd", comment: "lol that is so funny" },
  {
    id: uuidv4(),
    username: "Skyl3r",
    comment: "I like to go birdwatching with my dog",
  },
  { id: uuidv4(), username: "gigboi", comment: "I have seen bigger melons" },
  { id: uuidv4(), username: "onlysaywoof", comment: "woof woof woof" },
];

app.get("/comments", (req, res) => {
  res.render("comments/index.ejs", { comments });
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show.ejs", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  res.render("comments/edit.ejs", { foundComment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id != id);
  res.redirect("/comments");
});

app.get("/comment/new", (req, res) => {
  res.render("comments/new.ejs");
});

app.post("/comment/new", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuidv4(), username, comment });
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
