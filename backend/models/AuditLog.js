const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: { type: String, enum: ['CREATE', 'UPDATE', 'DELETE'], required: true },
    collectionName: { type: String, required: true }, // e.g., 'Lorry', 'Trip'
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional if system action
    changes: { type: mongoose.Schema.Types.Mixed }, // Store the diff or the new state
    timestamp: { type: Date, default: Date.now, immutable: true } // Make timestamp immutable
});

// Create a capped collection for logs if desired, or just standard.
// For "couldn't be erasable", technically a standard collection with strict permissions is best.
// We will enforce "no delete" in the controller/routes (i.e., simply don't create a delete route).

module.exports = mongoose.model('AuditLog', AuditLogSchema);
