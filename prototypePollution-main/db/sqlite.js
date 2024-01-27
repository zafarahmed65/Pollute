// db/sqlite.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

module.exports = db;
