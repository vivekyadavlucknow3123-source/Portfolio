/**
 * Database Configuration
 * Creates and exports a MySQL connection pool using mysql2/promise.
 * A pool is used (instead of a single connection) so the server can
 * handle multiple concurrent requests efficiently.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

/**
 * Verifies the database connection on startup.
 * Logs a clear success/failure message so setup issues are easy to spot.
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connected successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    console.error(
      '   Make sure MySQL is running and the credentials in your .env file are correct.'
    );
  }
}

module.exports = { pool, testConnection };
