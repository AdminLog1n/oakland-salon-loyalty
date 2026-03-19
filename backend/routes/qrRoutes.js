const qr = require('qrcode');

const generateQRCode = async (data) => {
    try {
        const qrCode = await qr.toFile('qrCode.png', data, {
            color: {
                dark: '#000000',  // Black dots
                light: '#FFFFFF' // White background
            }
        });
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
};

module.exports = generateQRCode;