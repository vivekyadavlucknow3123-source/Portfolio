/**
 * app.js
 * Entry point for the portfolio backend server.
 * Sets up Express, security middleware, static file serving for the
 * frontend, and mounts the /api/contact routes.
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { testConnection } = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------------- Security Middleware ------------------------- */

app.use(
  helmet({
    contentSecurityPolicy: false, // disabled so CDN libraries (GSAP, AOS, etc.) load freely
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
  })
);

// Rate limit the contact API to prevent spam/abuse
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});
app.use('/api/contact', contactLimiter);

/* ----------------------------- Body Parsing ------------------------------ */

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* --------------------------- Static Frontend ----------------------------- */

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

/* --------------------------------- API ------------------------------------ */

app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running.' });
});

/* ------------------------------ Fallback Route ---------------------------- */

// Serve index.html for the root route (and any unmatched non-API GET route)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

/* ------------------------------ Error Handler ------------------------------ */

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

/* --------------------------------- Start ----------------------------------- */

app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await testConnection();
});

module.exports = app;
