const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());


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

app.post('/personal-info', (req, res) => {
    const { registration_date, member_id, first_name, last_name, birth_date, gender, marital_status, employment_status, 
        occupation, phone_number, mobile_number, email, address_line1, address_line2, zone_area, postal_code } = req.body;

    const query = `INSERT INTO members 
        (registration_date, member_id, first_name, last_name, birth_date, gender, marital_status, employment_status, occupation, 
        phone_number, mobile_number, email, address_line1, address_line2, zone_area, postal_code) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [registration_date, member_id, first_name, last_name, birth_date, gender, marital_status, employment_status,
        occupation, phone_number, mobile_number, email, address_line1, address_line2, zone_area, postal_code
    ], (err) => {
        if (err) return res.status(500).send('Error saving personal info');
        res.send('Personal information saved successfully');
    });
});


app.post('/spousal-info', (req, res) => {
    const { spouse_id, member_id, spouse_first_name, spouse_maiden_name, spouse_last_name, spouse_birth_date, spouse_gender, 
        spouse_phone_number, spouse_mobile_number, spouse_employment_status, spouse_occupation, spouse_religion } = req.body;

    const query = `INSERT INTO spouses 
        (spouse_id, member_id, spouse_first_name, spouse_maiden_name, spouse_last_name, spouse_birth_date, spouse_gender, 
        spouse_phone_number, spouse_mobile_number, spouse_employment_status, spouse_occupation, spouse_religion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [spouse_id, member_id, spouse_first_name, spouse_maiden_name, spouse_last_name, spouse_birth_date, spouse_gender,
        spouse_phone_number, spouse_mobile_number, spouse_employment_status, spouse_occupation, spouse_religion
    ], (err) => {
        if (err) return res.status(500).send('Error saving spousal info');
        res.send('Spousal information saved successfully');
    });
});

// Route for dependents information form
app.post('/dependents-info', (req, res) => {
    const { dependent_id, member_id, dependent_name, dependent_birth_date, dependent_gender, dependent_relationship, attends_sunday_school } = req.body;
    const query = 'INSERT INTO dependents (dependent_name, dependent_birthdate, dependent_relationship, attends_sunday_school) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [dependent_id, member_id,dependent_name, dependent_birth_date, dependent_gender, dependent_relationship, attends_sunday_school], (err) => {
        if (err) return res.status(500).send('Error saving dependents info');
        res.send('Dependents information saved successfully');
    });
});

// Route for sacramental life information form
app.post('/sacramental-info', (req, res) => {
    const { sacramental_id, member_id, baptismal_number, baptised, baptism_place, baptism_date, father_names, mother_names, sponsor_names, baptism_clergy_name, confirmed,
        confirmation_date, confirmation_place, confirmation_clergy_name, holy_matrimony, holy_matrimony_date, holy_matrimony_place } = req.body;
    const query = 'INSERT INTO sacramental_life (baptised, baptism_place, baptism_sponsor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [ sacramental_id, member_id, baptismal_number, baptised, baptism_place, baptism_date, father_names, mother_names, sponsor_names, baptism_clergy_name, 
        confirmed, confirmation_date, confirmation_place, confirmation_clergy_name, holy_matrimony, holy_matrimony_date, holy_matrimony_place], (err) => {
        if (err) return res.status(500).send('Error saving sacramental info');
        res.send('Sacramental information saved successfully');
    });
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

