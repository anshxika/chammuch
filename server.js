const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

const cors = require("cors");

// Enable CORS for all origins
app.use(cors());


// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Dummy "database" to store users, profiles, and orders
const users = [];
const orders = [];
const profiles = [];

// Signup route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    users.push({ username, password });
    profiles.push({ username, name: "Default Name", email: "default@example.com" }); // Default profile
    orders.push({ username, history: [] }); // Empty order history
    res.status(201).json({ message: "Signup successful!" });
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        // Send user profile and order history on successful login
        const userProfile = profiles.find((profile) => profile.username === username);
        const userOrders = orders.find((order) => order.username === username);
        return res.status(200).json({ 
            message: "Login successful!", 
            profile: userProfile,
            orders: userOrders.history 
        });
    } else {
        return res.status(401).json({ message: "Invalid credentials." });
    }
});

// Route to update profile (example)
app.put("/profile", (req, res) => {
    const { username, name, email } = req.body;
    const userProfile = profiles.find((profile) => profile.username === username);

    if (userProfile) {
        userProfile.name = name || userProfile.name;
        userProfile.email = email || userProfile.email;
        return res.status(200).json({ message: "Profile updated successfully!" });
    } else {
        return res.status(404).json({ message: "Profile not found!" });
    }
});

// Route to add an order (for testing)
app.post("/order", (req, res) => {
    const { username, order } = req.body;
    const userOrders = orders.find((orderHistory) => orderHistory.username === username);

    if (userOrders) {
        userOrders.history.push(order); // Add the new order to the history
        return res.status(200).json({ message: "Order added successfully!" });
    } else {
        return res.status(404).json({ message: "User not found!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

