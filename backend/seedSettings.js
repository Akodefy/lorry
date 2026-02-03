const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const SystemSetting = require('./models/SystemSetting');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        const key = 'audit_lock_password';
        const plainPassword = 'Openthelock';

        // Check if setting exists
        const existing = await SystemSetting.findOne({ key });
        if (existing) {
            console.log('Lock password already exists in DB');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(plainPassword, salt);

            await SystemSetting.create({
                key,
                value: hashedPassword
            });
            console.log('Lock password created in DB');
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
