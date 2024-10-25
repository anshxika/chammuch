const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// File to store feedback data
const dataFilePath = path.join(__dirname, 'feedbackData.json'); // Use __dirname for correct file path

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

app.post('/submit-feedback', (req, res) => {
    const { rating, experience, suggestions, bugs } = req.body;

    const feedbackEntry = {
        rating,
        experience,
        suggestions,
        bugs,
        timestamp: new Date().toISOString(),
    };

    // Read existing feedback data
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading feedback data:', err);
            return res.status(500).send('Error saving feedback');
        }

        // Append new feedback entry
        const feedbackData = JSON.parse(data);
        feedbackData.push(feedbackEntry);

        // Write updated feedback data back to file
        fs.writeFile(dataFilePath, JSON.stringify(feedbackData, null, 2), (err) => {
            if (err) {
                console.error('Error saving feedback data:', err);
                return res.status(500).send('Error saving feedback');
            }
            res.status(200).send({ status: 'success', message: 'Feedback submitted successfully!' });
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

