const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sanitizeHtml = require("sanitize-html");

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes here...
// app.js
const db = require("../prototypePollution-main/db/sqlite"); // Path to your db.js file
// ... rest of your Express setup
app.get("/", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      const sanitizedPosts = rows.map((row) => ({
        ...row,
        content: sanitizeHtml(row.content),
      }));
      res.render("index", { posts: sanitizedPosts });
    }
  });
});
app.post("/post", (req, res) => {
  const content = req.body.content;
  // Deliberately not sanitizing content to demonstrate vulnerability
  db.run("INSERT INTO posts (content) VALUES (?)", [content], (err) => {
    // Error handling and response
  });
});

app.get("/vulnerable", (req, res) => {
  Object.assign({}, req.query);
  res.send("Prototype potentially polluted.");
});
app.get("/test-pollution", (req, res) => {
  const testObj = {};
  console.log(testObj.polluted); // Check if polluted is defined
  res.send("Check server console for pollution test result");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
