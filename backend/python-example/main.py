from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

DB_NAME = "test.db"
with sqlite3.connect(DB_NAME) as conn:
    cursor = conn.cursor()
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)"
    )
    conn.commit()

@app.route("/healthcheck")
def healthcheck_route():
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug=True, port=3000)