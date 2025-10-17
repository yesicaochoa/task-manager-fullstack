const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./tasks.db');

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    category TEXT DEFAULT 'general',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.get('/api/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/tasks/:id', (req, res) => {
  const sql = 'SELECT * FROM tasks WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description, priority, category } = req.body;
  const id = uuidv4();
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  const sql = `INSERT INTO tasks (id, title, description, priority, category) 
               VALUES (?, ?, ?, ?, ?)`;
  
  db.run(sql, [id, title, description || '', priority || 'medium', category || 'general'], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Return the created task
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(row);
    });
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const { title, description, completed, priority, category } = req.body;
  
  const sql = `UPDATE tasks 
               SET title = COALESCE(?, title),
                   description = COALESCE(?, description),
                   completed = COALESCE(?, completed),
                   priority = COALESCE(?, priority),
                   category = COALESCE(?, category),
                   updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;
  
  db.run(sql, [title, description, completed, priority, category, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    
    // Return the updated task
    db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  
  db.run(sql, [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    
    res.json({ message: 'Task deleted successfully' });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});
