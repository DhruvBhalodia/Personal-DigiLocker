const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'student_digilocker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) throw err;
            res.status(201).send('User created');
        });
    } catch {
        res.status(500).send();
    }
});

app.post('/login', (req, res) => {
    db.query('SELECT * FROM users WHERE name = ?', [req.body.name], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            try {
                if (await bcrypt.compare(req.body.password, results[0].password)) {
                    res.send('Logged in');
                } else {
                    res.send('Incorrect password');
                }
            } catch {
                res.status(500).send();
            }
        } else {
            res.send('Incorrect username');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
