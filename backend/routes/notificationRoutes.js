'use strict';

const express = require('express');
const admin = require('firebase-admin');
const geolib = require('geolib');

const router = express.Router();

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

// Function to send push notification
const sendPushNotification = async (deviceToken, message, userLocation, targetLocation) => {
    // Check if user is within 1km of the target location
    const distance = geolib.getDistance(
        { latitude: userLocation.lat, longitude: userLocation.lon },
        { latitude: targetLocation.lat, longitude: targetLocation.lon }
    );

    if (distance <= 1000) { // distance in meters
        // Send push notification
        const payload = {
            notification: {
                title: message.title,
                body: message.body,
            },
        };

        try {
            await admin.messaging().sendToDevice(deviceToken, payload);
            return { success: true, message: 'Notification sent' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    } else {
        return { success: false, message: 'User is not within the target area' };
    }
};

// Define route to send push notification
router.post('/send', async (req, res) => {
    const { deviceToken, message, userLocation, targetLocation } = req.body;
    
    const response = await sendPushNotification(deviceToken, message, userLocation, targetLocation);
    res.json(response);
});

module.exports = router;
