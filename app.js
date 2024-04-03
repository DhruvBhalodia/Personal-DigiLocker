const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors()); // Allow all origins - This is okay for development, but be more restrictive in production.
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dhruv@0204#2005@mysql',
    database: 'student_personal_digilocker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/signup', (req, res) => {
    const user = { username: req.body.username, password: req.body.password };
    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        res.status(201).send('User created');
    });
});

app.post('/login', (req, res) => {
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(200).json({ success: true, message: 'Logged in' });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect username or password' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});