const Driver = require('../models/Driver');
const logAudit = require('../utils/auditHelper');

exports.createDriver = async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        await logAudit('CREATE', 'Driver', driver._id, req.user ? req.user.id : null, req.body);
        res.status(201).json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate('assignedLorry');
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const oldDriver = await Driver.findById(req.params.id);
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logAudit('UPDATE', 'Driver', driver._id, req.user ? req.user.id : null, { old: oldDriver, new: req.body });
        res.json(driver);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        await Driver.findByIdAndDelete(req.params.id);
        await logAudit('DELETE', 'Driver', req.params.id, req.user ? req.user.id : null, driver);
        res.json({ message: 'Driver deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
