const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .sort({ timestamp: -1 })
            .populate('changedBy', 'name email'); // Assuming User model has name/email
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
