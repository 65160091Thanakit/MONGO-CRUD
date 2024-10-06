const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // เพิ่มเพื่อจัดการ CORS


// Import KPI routes
const kpiRoutes = require('./routes/kpiRoutes');
const itemRoutes = require('./routes/itemRoutes');


// Create Express app
const app = express();

// Middleware to parse incoming JSON requests and handle CORS
app.use(cors()); // เปิดใช้งาน CORS สำหรับการติดต่อกับ frontend
app.use(bodyParser.json());

// MongoDB connection (update with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/crud-example', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use KPI routes
app.use('/api', kpiRoutes); // ใช้เส้นทางสำหรับ KPI
app.use('/api', itemRoutes); // ใช้เส้นทางสำหรับ KPI

// Define a port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

