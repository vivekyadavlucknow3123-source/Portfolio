/**
 * Contact Routes
 * Defines the /api/contact endpoints and attaches input-validation rules.
 */

const express = require('express');
const { body, param } = require('express-validator');
const {
  submitContact,
  listContacts,
  getContact,
} = require('../controllers/contactController');

const router = express.Router();

// Validation rules applied to POST /api/contact
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ min: 3, max: 150 })
    .withMessage('Subject must be between 3 and 150 characters.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters.'),
];

// POST /api/contact - submit a new message
router.post('/', contactValidationRules, submitContact);

// GET /api/contact - list all messages
router.get('/', listContacts);

// GET /api/contact/:id - get a single message
router.get(
  '/:id',
  [param('id').isInt().withMessage('Contact ID must be an integer.')],
  getContact
);

module.exports = router;
