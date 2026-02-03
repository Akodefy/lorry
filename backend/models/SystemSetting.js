const mongoose = require('mongoose');

const SystemSettingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true } // Will store hashed password for 'lock_password'
});

module.exports = mongoose.model('SystemSetting', SystemSettingSchema);
