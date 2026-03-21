import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening...`);
});
