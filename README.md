# ClipLink – Backend

**ClipLink** is the backend service for a Micro-SaaS URL shortener and analytics platform. Users can shorten URLs, track click data, and monitor link performance via a personalized dashboard.

This backend is built with **Node.js**, **Express**, and **MongoDB**, and supports user authentication, link redirection with asynchronous analytics logging, and multi-user support.

---

## ⚙️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Other Libraries:**
  - `nanoid` – For generating unique short codes
  - `ua-parser-js` – For detecting devices and browsers
  - `request-ip` – To capture IP addresses

---

## 📁 Project Structure

```
/server
├── config/           # MongoDB connection setup
├── controllers/      # Core logic for each route
├── middleware/       # JWT authentication middleware
├── models/           # Mongoose schemas
├── routes/           # API route definitions
├── utils/            # Helper functions (e.g., URL generator)
├── .env              # Environment variables
├── server.js         # Application entry point
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Harshdev625/ClipLink-Backend.git
cd ClipLink-Backend/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file inside `/server` and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

### 4. Run the Server

For production:

```bash
npm start
```

For development (auto-restart using Nodemon):

```bash
npm run dev
```

---

## 🔐 Test Credentials

You can use the following credentials to test the app:

```json
{
  "email": "intern@dacoid.com",
  "password": "Test123"
}
```

---

## 📡 API Endpoints

### Authentication

- `POST /api/auth/login` – Login and receive JWT

### Link Management

- `POST /api/links/create` – Create a short URL
- `GET /api/links/my-links` – Get all links by the user
- `GET /:shortCode` – Redirect to original URL + log click

### Analytics

- `GET /api/analytics/:shortCode` – View click analytics

---

## 🚀 Features

- Secure login with JWT
- Short URL generation with optional custom alias
- Link expiration support
- Analytics tracking (IP, timestamp, device, browser)
- Asynchronous logging for redirection events
- MongoDB integration via Mongoose ODM

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Harsh Dev** .

---
