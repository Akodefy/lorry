const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = process.env.ADMIN_EMAIL || 'admin@yoyotransport.com';

        const adminExists = await User.findOne({ email });
        if (adminExists) {
            console.log(`Admin user (${email}) already exists`);
            process.exit();
        }

        const password = process.env.ADMIN_PASSWORD;
        if (!password) {
            console.error('ADMIN_PASSWORD must be set in .env to create a new admin');
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminUser = new User({
            name: 'Admin User',
            email: email,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log(`Email: ${email}`);
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
