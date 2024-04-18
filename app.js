const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const app = express();
app.set('view engine', 'ejs');
app.use(cors());
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
    const user = { username: req.body.username, password: req.body.password, isAdmin: req.body.isAdmin, isLogin: req.body.isLogin, email: req.body.email };
    db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(401).json({ success: false, message: 'Internal server error' });
        }
        res.status(201).send('User created');
    });
});
let studentId = "";
app.post('/login', (req, res) => {
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.username, req.body.password], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (results.length > 0) {
            studentId = req.body.username;

            let sql = `UPDATE users SET isLogin = true WHERE email = '${studentId}'`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('isLogin set to true successfully.');
            });

            return res.status(200).json({ success: true, message: 'Logged in' });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect username or password' });
        }
    });
});
app.post('/logout', (req, res) => {
    let sql = `UPDATE users SET isLogin = false WHERE email = '${studentId}'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        console.log("hi");
        return res.status(200).json({ success: true, message: 'Logout' });
    });
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const filePath = req.file.path;
        const folder = req.body.folder;
        console.log(file + " " + folder);
        const folderPath = path.join('uploads', folder);
        const newFilePath = path.join(folderPath, file.originalname);
        console.log(newFilePath + " " + folderPath + " " + folder);
        await fs.promises.mkdir(folderPath, { recursive: true });
        await fs.promises.rename(filePath, newFilePath);
        await saveFilePathToDB(newFilePath, folder);
        res.send('File uploaded and saved successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file.');
    }
});

async function saveFilePathToDB(filePath, folder) {
    try {
        console.log("save " + folder);
        db.query('INSERT INTO students (username, url, folder) VALUES (?, ?, ?)', [studentId, filePath, folder]);
    } catch (err) {
        console.error(err);
        res.status(500).send('cant insert');
    }
}

app.get('/folders', (req, res) => {
    var folders = ["Resume", "Result", "Assignment", "Documents", "Question Papers", "Other"];
    res.json(folders);
});

app.get('/files', (req, res) => {
    db.query('SELECT url FROM students WHERE username = ? AND folder = ? AND trash = FALSE', [studentId, req.query.folder], (error, results) => {
        if (error) {
            console.error(`Error fetching files for folder ${req.query.folder}:`, error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });

});

app.get('/delete', async (req, res) => {
    try {
        console.log("Hii");
        const fileName = req.query.file;
        console.log(fileName);
        db.query('UPDATE students SET trash = true WHERE url = ?', [fileName]);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting file:', error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});