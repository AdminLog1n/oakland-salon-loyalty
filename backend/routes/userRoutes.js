'use strict';

const admin = require('firebase-admin');
const express = require('express');

const router = express.Router();

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * @route POST /register
 * @desc Register a new user
 */
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name
        });
        res.status(201).json({ message: 'User registered successfully', uid: userRecord.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @route GET /users
 * @desc Get all users
 */
router.get('/users', async (req, res) => {
    try {
        const userRecords = await admin.auth().listUsers();
        res.status(200).json(userRecords.users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @route PUT /updateLocation
 * @desc Update user's location
 */
router.put('/updateLocation', async (req, res) => {
    const { uid, location } = req.body;

    try {
        await admin.auth().updateUser(uid, { location });
        res.status(200).json({ message: 'User location updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;