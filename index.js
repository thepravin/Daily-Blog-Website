// universal code -------------------------

const express = require("express");
const app = express();
const port = 8080;
// uuid
const { v4: uuidv4 } = require("uuid");
// mehtod-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
const { log } = require("console");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Listen to port : ${port}`);
});

//-----------------------------------------

// raw data
let posts = [
  {
    id: uuidv4(),
    username: "pravin",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "ganesh",
    content: "I am hardworking",
  },
  {
    id: uuidv4(),
    username: "amol",
    content: "I got selected for my 1st internship",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//---- post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body; // destructur and find username and content
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts"); // after clicking submit button go to home or posts page
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// ------- Patch = update

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params; //get
  let newContent = req.body.content; //post
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

// ---------Delet
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p)=>id!==p.id);
  res.redirect("/posts");
});
