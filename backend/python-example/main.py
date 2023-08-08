from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

DB_NAME = "test.db"
# automatically creates test.db if it doesn't exist
with sqlite3.connect(DB_NAME) as conn:
    cursor = conn.cursor()
    # create example table
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)"
    )
    # commit changes
    conn.commit()

@app.route("/healthcheck")
def healthcheck_route():
    return jsonify({"success": True})

if __name__ == "__main__":
    # Start app in debug mode on port 3000
    app.run(debug=True, port=3000)