# Vivek Yadav — Personal Portfolio

A premium, dark-themed, animation-rich personal portfolio website built with
vanilla HTML/CSS/JS on the frontend and a Node.js + Express + MySQL backend
for handling contact form submissions.

**Live sections:** Hero · About · Skills · Projects · Certificates · Contact

---

## ✨ Features

- Dark glassmorphism UI with a purple glow accent (`#A855F7` / `#9333EA`)
- GSAP-powered animations: loading screen, hero reveal, scroll-triggered
  reveals, magnetic buttons, custom cursor, parallax, tilt cards, animated
  counters
- AOS scroll animations, Typed.js typing effect, particles.js background
- Fully responsive: desktop, laptop, tablet, and mobile
- Express REST API backed by MySQL for storing contact form submissions
- Input validation on both the client and server
- SEO-ready: meta tags, Open Graph tags, favicon, `robots.txt`, `sitemap.xml`

---

## 🗂 Project Structure

```
Portfolio/
├── backend/
│   ├── app.js                    # Express app entry point
│   ├── package.json
│   ├── .env.example              # Copy to .env and fill in your values
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── routes/
│   │   └── contactRoutes.js      # /api/contact routes + validation rules
│   ├── controllers/
│   │   └── contactController.js  # Request handlers
│   ├── models/
│   │   └── contactModel.js       # SQL queries
│   └── database/
│       └── portfolio.sql         # Database + table schema
│
├── frontend/
│   ├── index.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── favicon.ico
│   ├── css/
│   │   ├── style.css / navbar.css / hero.css / about.css / skills.css
│   │   ├── projects.css / certificate.css / contact.css / footer.css
│   │   └── animation.css / responsive.css
│   ├── js/
│   │   ├── main.js / cursor.js / particles.js / animation.js
│   │   └── typing.js / navbar.js / contact.js
│   └── assets/
│       ├── images/    (profile photos, project mockups, favicons, OG image)
│       ├── icons/
│       └── resume/    (Vivek_Yadav_Resume.pdf)
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MySQL](https://dev.mysql.com/downloads/) 8.x (or any MySQL-compatible server)

### 2. Set up the database

```bash
mysql -u root -p < backend/database/portfolio.sql
```

This creates the `portfolio` database and the `contacts` table.

### 3. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio
CLIENT_URL=http://localhost:5000
```

### 4. Install dependencies

```bash
npm install
```

### 5. Run the server

```bash
npm start        # production
npm run dev       # development, with nodemon auto-reload
```

The server serves the frontend automatically. Open:

```
http://localhost:5000
```

The contact form will POST to `/api/contact` on the same origin, so no
extra configuration is needed when running this way.

> **Serving the frontend separately?** If you open `frontend/index.html`
> directly (e.g. with VS Code Live Server) instead of via the Express
> server, update `API_BASE` in `frontend/js/contact.js` to point at your
> backend, e.g. `http://localhost:5000/api/contact`.

---

## 🔌 API Reference

| Method | Endpoint             | Description                          |
|--------|-----------------------|---------------------------------------|
| POST   | `/api/contact`         | Submit a new contact form message     |
| GET    | `/api/contact`         | List all submitted messages           |
| GET    | `/api/contact/:id`     | Get a single message by ID            |
| GET    | `/api/health`           | Health check                          |

**POST /api/contact — body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Let's work together",
  "message": "Hi Vivek, I'd love to discuss a project with you."
}
```

**Success response (201):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully. I will get back to you soon!",
  "data": { "id": 1 }
}
```

> **Security note:** `GET /api/contact` currently returns all submissions
> without authentication. Before deploying to production, protect this
> route (e.g. with an admin auth middleware or API key) so your inbox
> isn't publicly readable.

---

## 🎨 Customizing

- **Colors & fonts:** edit the CSS custom properties at the top of
  `frontend/css/style.css`.
- **Content:** update copy directly in `frontend/index.html`.
- **Resume:** replace `frontend/assets/resume/Vivek_Yadav_Resume.pdf` with
  your own PDF (keep the same filename, or update the `href` in
  `index.html`).
- **Certificates:** the certificates section currently shows a "more
  coming soon" state. Add `.cert-card` elements (styles already defined in
  `certificate.css`) inside `.cert-timeline` once you have certificates to
  display.

---

## 🛠 Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript, GSAP, AOS, Typed.js,
Font Awesome, particles.js

**Backend:** Node.js, Express.js, MySQL (via `mysql2`), express-validator,
helmet, express-rate-limit, cors

---

## 📄 License

This project is free to use and adapt for your own portfolio.

---

Designed & developed by **Vivek Yadav** — [GitHub](https://github.com/vivekyadavlucknow3123-source) · [LinkedIn](https://www.linkedin.com/in/vivek-yadav99/)
