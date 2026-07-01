/**
 * Database Configuration
 * Creates and exports a MySQL connection pool using mysql2/promise.
 * A pool is used (instead of a single connection) so the server can
 * handle multiple concurrent requests efficiently.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ TiDB database connected successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

module.exports = { pool, testConnection };
