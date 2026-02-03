const AuditLog = require('../models/AuditLog');

const logAudit = async (action, collectionName, documentId, changedBy, changes) => {
    try {
        await AuditLog.create({
            action,
            collectionName,
            documentId,
            changedBy,
            changes
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
        // We don't want to fail the main transaction just because logging failed, 
        // but in a strict audit system, you might want to throw error.
        // For this app, logging to console is sufficient backup.
    }
};

module.exports = logAudit;
