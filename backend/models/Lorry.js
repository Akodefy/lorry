const mongoose = require('mongoose');

const LorrySchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true },
    model: String,
    registrationDate: Date,
    ownerName: String,
    capacity: Number, // in tons
    chassisNumber: String,
    engineNumber: String,
    documents: {
        roadTaxExpiry: Date,
        insuranceExpiry: Date,
        fitnessCertExpiry: Date,
        permitExpiry: Date,
        pollutionCertExpiry: Date,
        nationalPermitExpiry: Date
    },
    status: { type: String, enum: ['available', 'on-trip', 'maintenance'], default: 'available' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lorry', LorrySchema);
