/**
 * Contact Controller
 * Contains the request-handling logic for the contact form endpoints.
 * Validation is performed with express-validator before these handlers run
 * (see routes/contactRoutes.js), but a defensive check is kept here too.
 */

const { validationResult } = require('express-validator');
const {
  createContact,
  getAllContacts,
  getContactById,
} = require('../models/contactModel');

/**
 * POST /api/contact
 * Validates and stores a new contact form submission.
 */
async function submitContact(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, subject, message } = req.body;

    const insertId = await createContact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. I will get back to you soon!',
      data: { id: insertId },
    });
  } catch (error) {
    console.error('Error in submitContact:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    });
  }
}

/**
 * GET /api/contact
 * Returns all stored contact submissions.
 * In production, this route should be protected by authentication —
 * see the README for notes on securing it.
 */
async function listContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Error in listContacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching messages.',
    });
  }
}

/**
 * GET /api/contact/:id
 * Returns a single contact submission by ID.
 */
async function getContact(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact ID.' });
    }

    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found.' });
    }

    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error in getContact:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching the message.',
    });
  }
}

module.exports = { submitContact, listContacts, getContact };
