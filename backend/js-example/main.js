const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express()
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Connect to the SQLite3 database
const db = new sqlite3.Database('user_tasks.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      due_date TIMESTAMP,
      recurring_interval INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      priority TEXT,
      category TEXT,
      duration INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});


app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10; // Number of rounds for the hashing process
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ message: 'User created successfully' });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database by username
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      try {
        // Compare hashed password using the user's salt
        const passwordMatches = await bcrypt.compare(
          password,
          user.password
        );
        if (!passwordMatches) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Passwords match, user is authenticated
        res.status(200).json({ message: 'Login successful', user: {username: user.username, email: user.email} });
      } catch (bcryptErr) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
});

// Create a task
app.post('/tasks', (req, res) => {
  const { user_id, title, description, due_date, recurring_interval } = req.body;
  const interval = recurring_interval ? recurring_interval : null;

  db.run(
    'INSERT INTO tasks (user_id, title, description, due_date, recurring_interval) VALUES (?, ?, ?, ?, ?)',
    [user_id, title, description, due_date, interval],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create task' });
      }
      res.status(201).json({ message: 'Task created successfully' });
    }
  );
});

// Get all tasks
app.get('/tasks:id', (req, res) => {
  const userId = req.params.id;
  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
    res.status(200).json(tasks);
  });
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, task) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch task' });
    }
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  });
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { user_id, title, description, due_date, recurring_interval } = req.body;
  const interval = recurring_interval ? recurring_interval : null;
  db.run(
    'UPDATE tasks SET user_id = ?, title = ?, description = ?, due_date = ?, recurring_interval = ? WHERE id = ?',
    [user_id, title, description, due_date, interval, taskId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update task' });
      }
      res.status(200).json({ message: 'Task updated successfully' });
    }
  );
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  db.run('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log("API running on port 3000")
})
