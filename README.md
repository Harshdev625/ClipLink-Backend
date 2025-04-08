# 🔗 ClipLink - Backend

ClipLink is a Micro-SaaS URL shortener and analytics platform. This backend is built with **Node.js**, **Express**, and **MongoDB**, offering functionality like authentication, URL shortening, redirection, and detailed analytics.

---

## 📦 Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT Authentication
- **Analytics:** Device & Browser detection using `ua-parser-js`
- **Short Code Generator:** `nanoid`

---

## 📁 Project Structure

```
/server
├── controllers/      # Route logic
├── models/           # Mongoose models
├── routes/           # API endpoints
├── middleware/       # Auth middleware
├── utils/            # Helper functions
├── config/           # MongoDB connection
├── .env              # Environment variables
├── server.js         # App entry point
└── package.json
```

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ClipLink-backend.git
cd ClipLink-backend/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ClipLink
JWT_SECRET=your_jwt_secret_key
BASE_URL=http://localhost:5000
```

### 4. Run the server
```bash
npm start
```

---

## 🔐 Test Credentials

You can use the following hardcoded user for login:

```json
{
  "email": "intern@dacoid.com",
  "password": "Test123"
}
```

---

## 🚀 API Endpoints

### Auth
- `POST /api/auth/login` — Get JWT token

### Link Management
- `POST /api/links/create` — Create short URL
- `GET /api/links/my-links` — Get user's links
- `GET /:shortCode` — Redirect and track

### Analytics
- `GET /api/analytics/:shortCode` — Get click logs

---

## 🧪 Postman Collection

You can import the [Postman Collection](./ClipLink_Postman_Collection_20250407.json) to test all endpoints easily.

---

## 📈 Analytics Tracked

Each click logs:
- IP address
- Timestamp
- Device type (mobile/desktop)
- Browser and OS

---

## 🧠 Future Features (optional)
- QR Code Generator
- Expired link cleanup
- Pagination and search on dashboard

---

## 🛠 Author & License

Built by [Your Name] for the DACOID SDE Internship Assignment.  
MIT License.
