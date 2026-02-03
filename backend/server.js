const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Yoyo Transport API is running');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const lorryRoutes = require('./routes/lorryRoutes');
const tripRoutes = require('./routes/tripRoutes');
const driverRoutes = require('./routes/driverRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const auditRoutes = require('./routes/auditRoutes');
const settingRoutes = require('./routes/settingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/lorries', lorryRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/settings', settingRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Self-ping to keep service alive (optional, better handled by external monitoring service like UptimeRobot)
// Using Render's free tier spins down after inactivity. This helps but isn't a silver bullet inside the app itself.
// However, implementing as requested:
// Keep-alive mechanism for Render
const https = require('https');
setInterval(() => {
    const url = 'https://lorry-1tu2.onrender.com';
    console.log(`[Keep-Alive] Pinging ${url}...`);

    https.get(url, (res) => {
        console.log(`[Keep-Alive] Status: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`[Keep-Alive] Error: ${err.message}`);
    });
}, 5 * 60 * 1000); // Run every 5 minutes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
