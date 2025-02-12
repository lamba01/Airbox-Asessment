# Airbox Scheduling System

This is an MVP scheduling interface and admin dashboard for Airbox. The project consists of a **frontend** built with React and a **backend** using Node.js, Express, and MongoDB.

## **Project Structure**

/Airbox-Asessment
│── frontend/ # React frontend (Vite + Tailwind)
│── backend/ # Node.js + Express + MongoDB backend
│── README.md
|── docker-compose.yml

## **Technologies Used**

### **Frontend**

- React (Vite)
- Tailwind CSS
- React Router
- Axios

### **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- dotenv (for environment variables)

## **Getting Started**

### **1. Clone the Repository**

```sh
git clone https://github.com/lamba01/Airbox-Asessment.git
cd Airbox-Asessment

cd backend
npm install
cp .env.example .env
npm run dev  # Starts the backend server


cd ../frontend
npm install
npm run dev  # Starts the React frontend


Running with Docker (Optional)
docker-compose up --build

```

Architecture Overview

- Frontend (React + Tailwind): Handles UI, user interactions, and API communication.
- Backend (Express + MongoDB): Manages data, authentication, and business logic.
- Database (MongoDB): Stores user bookings and schedules.

Assumptions & Limitations

Assumptions

- Users can only book available time slots.
- Admins have full access to modify schedules.
- Authentication is required for booking features.

Limitations

- No real-time updates (WebSockets not implemented).
- No payment integration.

Brief Security Measures Implemented

- JWT Authentication → Ensures secure access to protected routes.
- Environment Variables (.env) → Hides sensitive credentials (DB connection, JWT secret).
- CORS Configuration → Restricts API access to specific origins.
- Input Validation (Mongoose Schema & Middleware) → Prevents invalid or malicious data.
- Error Handling with Proper Status Codes → Prevents information leaks.
- Password Hashing (bcrypt) → If storing user passwords, they are encrypted.
- MongoDB Indexing → Prevents slow queries that could be exploited via DoS attacks.

Deployment
The live project is deployed at:
🔗 https://airbox-asessment.vercel.app/
