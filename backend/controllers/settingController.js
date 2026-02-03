const SystemSetting = require('../models/SystemSetting');
const bcrypt = require('bcryptjs');

exports.verifyLockPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const setting = await SystemSetting.findOne({ key: 'audit_lock_password' });

        if (!setting) {
            return res.status(404).json({ message: 'Lock password not configured' });
        }

        const isMatch = await bcrypt.compare(password, setting.value);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        res.json({ success: true, message: 'Access Granted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
