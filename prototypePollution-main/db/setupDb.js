// db/setupDb.js
const fs = require("fs");
const path = require("path");
const db = require("./sqlite");

// Correct the path to point to the project root
const schemaPath = path.join(__dirname, "..", "schema.sql");

fs.readFile(schemaPath, "utf8", (err, schema) => {
  if (err) {
    console.error(err.message);
    return;
  }
  db.exec(schema, (err) => {
    if (err) {
      console.error(err.message);
      return;
    } else {
      console.log("Database schema created successfully.");
      db.close();
    }
  });
});
