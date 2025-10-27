const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const port = 3001; // Choose a different port than your frontend (Vite usually runs on 5173)

// Connect to database
connectDB();

// --- Security and Logging Middleware ---

// Add security headers
app.use(helmet());

// Enable CORS for all origins
app.use(cors());

// HTTP request logger
app.use(morgan('dev'));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
// Add budget and user profile routes here in the future

// Custom Error Handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
