import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { handleError } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Perplexity API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// 404 - Not Found Handler
app.use((req, res) => {
  const err = new Error('Route not found');
  err.statusCode = 404;
  throw err;
});

// Global Error Handling Middleware (must be last)
// app.use(handleError);

export default app;
