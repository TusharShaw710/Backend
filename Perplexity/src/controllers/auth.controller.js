
import User from '../models/user.model.js';
import { sendEmail } from '../services/mail.service.js';


export async function register(req, res, next){
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    const err = new Error(existingUser.email === email ? 'Email already registered' : 'Username already taken');
    err.statusCode = 409;
    return next(err);
  }

  // Create new user
  const newUser = new User({
    username,
    email,
    password,
  });

  await newUser.save();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });

  sendEmail(
    email,
    'Welcome to Our App!',
    `Hi ${username},\n\nThank you for registering at our app! We're excited to have you on board.\n\nBest regards,\nThe Team`
  ).catch(err => {
    console.error('Error sending welcome email:', err);
  });
};