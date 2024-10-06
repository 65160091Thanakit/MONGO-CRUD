const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import item routes
const itemRoutes = require('./routes/itemRoutes');

// Create Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB connection (update with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/crud-example')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use routes
app.use('/items', itemRoutes);

// Define a port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port  http://localhost:${port}`);
});
