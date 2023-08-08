const express = require("express")
const sqlite3 = require("sqlite3").verbose()

const app = express()
// automatically creates test.db if it doesn't exist
const db = new sqlite3.Database("test.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message)
  } else {
    //create example table
    db.run(
      "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)"
    )
  }
})

app.get("/healthcheck", (req, res) => {
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log("API running on port 3000")
})
