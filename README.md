# Movie Booking Backend App 🏛️🎬

[![Node.js](https://img.shields.io/badge/Node.js-v20.x-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green.svg)](https://mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## Overview

A robust, scalable **Movie Booking Backend API** built with Node.js, Express.js, and MongoDB. This full-featured backend handles user authentication, movie/theatre/show management, seat bookings, ticket generation, payment processing, email notifications, and scheduled cron jobs for reminders.

**Author**: Mehak  
**Version**: 1.0.0

## 🚀 Features

- **User Management**: Registration, login, profile management with JWT authentication and bcrypt password hashing.
- **Movie & Theatre Management**: CRUD operations for movies, theatres, and shows.
- **Booking & Ticketing**: Seat selection, booking creation, ticket generation and notifications.
- **Payment Integration**: Secure payment processing (via services like Razorpay/Stripe - configurable).
- **Email Notifications**: Automated emails using Nodemailer for booking confirmations, reminders.
- **Cron Jobs**: Scheduled tasks for ticket reminders and other notifications.
- **Middleware Security**: Auth validation, input sanitization, error handling.
- **RESTful API**: Clean, versioned endpoints with standardized response format.
- **MongoDB**: Schema-based models with Mongoose ODM.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Runtime  | Node.js (ESM) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth     | JWT + bcrypt |
| Email    | Nodemailer |
| Jobs     | node-cron |
| Utils    | dotenv, axios |
| Dev      | nodemon |

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Setup
```bash
# Clone the repo
git clone <your-repo-url>
cd Movie-Booking-Backend-App

# Install dependencies
npm install
```

### Environment Variables
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviebooking
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PAYMENT_KEY=your_payment_key  # e.g., Razorpay key
PAYMENT_SECRET=your_payment_secret
```

### Run the App
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server will start on `http://localhost:${PORT}`. Access Swagger/Postman for APIs or see endpoints below.

## 📁 Project Structure
```
Movie-Booking-Backend-App/
├── config/          # DB & Mail config
├── controllers/     # Request handlers
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # Business logic
├── middlewares/     # Auth, validation
├── utils/           # Helpers & constants
├── cron/            # Scheduled jobs
├── index.js         # Entry point
├── package.json
└── README.md
```

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Resource | Endpoint | Method | Auth | Description |
|----------|----------|--------|------|-------------|
| **Auth** | `/auth/register` | POST | No | Register user |
|          | `/auth/login` | POST | No | Login & get JWT |
| **Users** | `/users/profile` | GET | Yes | Get user profile |
| **Movies** | `/movies` | GET/POST | Yes* | List/Create movies |
|          | `/movies/:id` | GET/PUT/DEL | Yes | CRUD movie |
| **Theatres** | `/theatres` | GET/POST | Yes | List/Create theatres |
| **Shows** | `/shows` | GET/POST | Yes | List/Create shows |
| **Bookings** | `/bookings` | POST | Yes | Create booking |
|          | `/bookings/:id` | GET | Yes | Get booking details |
| **Tickets** | `/tickets` | POST | Yes | Generate ticket |
| **Payments** | `/payments` | POST | Yes | Process payment |

*Admin-only for POST/PUT/DEL.

**Response Format** (standardized via utils/responsebody.js):
```json
{
  \"success\": true/false,
  \"message\": \"...`,
  \"data\": {...}
}
```

## 🧪 Testing
- Run `npm test` (add tests as needed).
- Use Postman collection (create one) or Thunder Client in VSCode.
- Seed DB for testing movies/theatres.

## 🔧 Database Setup
1. Install MongoDB or use [MongoDB Atlas](https://mongodb.com/atlas).
2. Update `MONGO_URI` in `.env`.
3. Run `npm run dev` - auto-connects.

## 📧 Emails & Cron
- Cron jobs (`cron/cron.js`) run mailer for ticket reminders.
- Configure SMTP in `.env`.

## 🤝 Contributing
1. Fork the repo.
2. Create feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push & PR.

## 📄 License
This project is [ISC](LICENSE) licensed.

## 🙌 Acknowledgments
- Built with ❤️ using Express & MongoDB.
- Stars ⭐ & PRs welcome!

---
*For detailed API docs, generate Swagger or check controllers/routes.*

