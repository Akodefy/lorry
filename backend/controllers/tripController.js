const Trip = require('../models/Trip');
const logAudit = require('../utils/auditHelper');

exports.createTrip = async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();
        await logAudit('CREATE', 'Trip', trip._id, req.user ? req.user.id : null, req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate('lorry').populate('driver');
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTrip = async (req, res) => {
    try {
        const oldTrip = await Trip.findById(req.params.id);
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logAudit('UPDATE', 'Trip', trip._id, req.user ? req.user.id : null, { old: oldTrip, new: req.body });
        res.json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        await Trip.findByIdAndDelete(req.params.id);
        await logAudit('DELETE', 'Trip', req.params.id, req.user ? req.user.id : null, trip);
        res.json({ message: 'Trip deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTripPod = async (req, res) => {
    try {
        const { receiverName, date, remarks } = req.body;
        const updateData = {
            status: 'Completed',
            pod: {
                receiverName,
                date,
                remarks,
                image: req.file ? req.file.path : null // Cloudinary URL
            }
        };

        const oldTrip = await Trip.findById(req.params.id);
        const trip = await Trip.findByIdAndUpdate(req.params.id, updateData, { new: true });
        await logAudit('UPDATE_POD', 'Trip', trip._id, req.user ? req.user.id : null, { old: oldTrip, new: updateData });
        res.json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
