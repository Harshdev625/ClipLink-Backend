const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/link.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/', require('./routes/redirect.routes'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));