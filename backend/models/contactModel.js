/**
 * Contact Model
 * Encapsulates all raw SQL queries for the `contacts` table.
 * Controllers call these functions instead of writing SQL directly,
 * keeping data-access logic in one place.
 */

const { pool } = require('../config/db');

/**
 * Inserts a new contact form submission into the database.
 * @param {{name: string, email: string, subject: string, message: string}} data
 * @returns {Promise<number>} The inserted row's ID.
 */
async function createContact({ name, email, subject, message }) {
  const [result] = await pool.execute(
    `INSERT INTO contacts (name, email, subject, message, created_at)
     VALUES (:name, :email, :subject, :message, NOW())`,
    { name, email, subject, message }
  );
  return result.insertId;
}

/**
 * Retrieves all contact submissions, most recent first.
 * @returns {Promise<Array>} List of contact rows.
 */
async function getAllContacts() {
  const [rows] = await pool.query(
    `SELECT id, name, email, subject, message, created_at
     FROM contacts
     ORDER BY created_at DESC`
  );
  return rows;
}

/**
 * Retrieves a single contact submission by its ID.
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function getContactById(id) {
  const [rows] = await pool.execute(
    `SELECT id, name, email, subject, message, created_at
     FROM contacts WHERE id = :id`,
    { id }
  );
  return rows[0] || null;
}

module.exports = { createContact, getAllContacts, getContactById };
