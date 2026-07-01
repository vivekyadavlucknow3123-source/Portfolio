-- =========================================================
-- Portfolio Database Schema
-- Author: Vivek Yadav
-- Description: Creates the `portfolio` database and the
--              `contacts` table used to store contact form
--              submissions from the portfolio website.
-- =========================================================

CREATE DATABASE IF NOT EXISTS portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio;

-- ---------------------------------------------------------
-- Table: contacts
-- Stores every message submitted through the contact form.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contacts_created_at (created_at),
  INDEX idx_contacts_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------
-- Sample row (optional) — remove or comment out in production
-- ---------------------------------------------------------
-- INSERT INTO contacts (name, email, subject, message)
-- VALUES ('Test User', 'test@example.com', 'Hello', 'This is a test message.');
