const express = require("express")
const db = require("better-sqlite3")("test.db")

const app = express()

db.exec(
  "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)"
)

app.get("/healthcheck", (req, res) => {
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log("API running on port 3000")
})
