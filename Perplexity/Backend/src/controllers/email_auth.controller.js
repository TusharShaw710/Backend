import { oauth2Client } from "../utils/gmail.js";
import userEmailModel from "../models/userEmail.model.js";
import { google } from 'googleapis';

const scopes = [
    'https://www.googleapis.com/auth/gmail.send'
];

export const googleAuth = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
    const code = req.query.code;
    try {
        //Get Tokens
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        //Get user email from google
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        const userInfo = await oauth2.userinfo.get();
        const userEmail = userInfo.data.email;

        const userId=req.user.id;

        await userEmailModel.findOneAndUpdate(
            { userId },
            { email: userEmail, refresh_token: tokens.refresh_token },
            { upsert: true, new: true }
        );


        res.send('Gmail account linked successfully!You can now send emails using this account.');
    } catch (error) {
        console.error('Error occurred while fetching tokens:', error);
        res.status(500).send('Error occurred while fetching tokens.');
    }
};