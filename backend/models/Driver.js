const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseExpiry: Date,
    assignedLorry: { type: mongoose.Schema.Types.ObjectId, ref: 'Lorry', default: null },
    salaryType: { type: String, enum: ['monthly', 'trip-based'], default: 'monthly' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Driver', DriverSchema);
