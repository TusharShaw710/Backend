import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/database.js';
import { testAi } from './genAi.js';

dotenv.config();

testAi();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening...`);
});
