const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.static('public'));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Twentyse7en',
    database: 'fortress_sys'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

// Example route to get data from a table
app.get('/members', (req, res) => {
    const query = 'SELECT * FROM MEMBERS'; // Replace with your actual table name
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).send('Database query failed');
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});

