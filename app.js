const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Member = require('./models/member');

const app = express();
const port = 3000;

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS)
app.use(express.static('public'));

// Test the database connection and sync the model
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync(); // Sync all defined models to the DB
    })
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/form.html');
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { firstName, lastName, email, clubPosition, paymentMethod } = req.body;

    try {
        // Create a new member record
        const newMember = await Member.create({
            firstName,
            lastName,
            email,
            clubPosition,
            paymentMethod
        });
        console.log('New member created:', newMember.toJSON());
        res.send('Registration successful!');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.send('There was an error in registration.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
