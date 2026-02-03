const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
    lorry: { type: mongoose.Schema.Types.ObjectId, ref: 'Lorry', required: true },
    serviceType: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    meterReading: Number,
    cost: Number,
    nextServiceDue: {
        km: Number,
        date: Date
    },
    garageName: String,
    invoiceImage: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
