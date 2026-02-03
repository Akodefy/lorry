const Maintenance = require('../models/Maintenance');
const logAudit = require('../utils/auditHelper');

exports.createMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenance(req.body);
        await maintenance.save();
        await logAudit('CREATE', 'Maintenance', maintenance._id, req.user ? req.user.id : null, req.body);
        res.status(201).json(maintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMaintenanceRecords = async (req, res) => {
    try {
        const records = await Maintenance.find().populate('lorry');
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMaintenance = async (req, res) => {
    try {
        const oldRecord = await Maintenance.findById(req.params.id);
        const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await logAudit('UPDATE', 'Maintenance', maintenance._id, req.user ? req.user.id : null, { old: oldRecord, new: req.body });
        res.json(maintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    try {
        const record = await Maintenance.findById(req.params.id);
        await Maintenance.findByIdAndDelete(req.params.id);
        await logAudit('DELETE', 'Maintenance', req.params.id, req.user ? req.user.id : null, record);
        res.json({ message: 'Record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
