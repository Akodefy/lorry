const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    tripId: { type: String, unique: true }, // Logic to auto-generate this could be in controller
    lorry: { type: mongoose.Schema.Types.ObjectId, ref: 'Lorry', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    startDate: { type: Date, required: true },
    expectedReturnDate: Date,
    loadDetails: {
        loadType: String,
        weight: Number, // in tons/kg
        rate: Number, // per ton or fixed
        totalValue: Number // calculated
    },
    costs: {
        diesel: { type: Number, default: 0 },
        toll: { type: Number, default: 0 },
        loadingUnloading: { type: Number, default: 0 },
        driverAdvance: { type: Number, default: 0 },
        other: { type: Number, default: 0 }
    },
    status: { type: String, enum: ['created', 'ongoing', 'completed', 'cancelled'], default: 'created' },
    pod: {
        image: String, // URL/Path
        date: Date,
        receiverName: String,
        remarks: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);
