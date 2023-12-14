const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin');

const router = express.Router();

// Route to handle admin login
router.post('/admin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        // If admin not found or password doesn't match, return an error
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate and send the JWT token
        const token = admin.generateAuthToken();
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
