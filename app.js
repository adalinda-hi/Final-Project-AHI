// Adalinda Halstead-Ibarra 113650011
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mysql = require('mysql');
const cors = require('cors');
const sanitizeHtml = require('sanitize-html');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SQLP@ssw0rd!',
  database: 'final_project'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

// Route to add a comment
app.post('/api/comments', (req, res) => {
  const { content, postId, authorId } = req.body;
  connection.query(
    'INSERT INTO comments (content, post_id, author_id) VALUES (?, ?, ?)',
    [content, postId, authorId],
    (error, results) => {
      if (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Comment added successfully!');
    }
  );
});

// Route to delete a comment
app.delete('/api/comments/:id', (req, res) => {
  const commentId = req.params.id;
  connection.query('DELETE FROM comments WHERE id = ?', [commentId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Comment deleted successfully!');
  });
});

// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('Server is running.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});