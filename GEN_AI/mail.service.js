
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email service:', error);
    }
});


export async function sendEmail({ to, subject, html, text = '' }) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text: text || 'Please view this email in an HTML-compatible client.',
        html
    };

    await transporter.sendMail(mailOptions,(error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully to'+ to );
        }
    });
}