# MERN User CRUD Application

A full-stack MERN application built using:

- Next.js 16
- Tailwind CSS
- Express.js
- MongoDB (Mongoose)

The application supports Create, Read, Update, and Delete (CRUD) operations with proper validation, loading indicators, and responsive design.

---

## Setup Instructions

## Backend Setup

```bash
cd backend
npm install
```

### environment variables

PORT=5000
MONGO_URI=mongodb+srv://srisruthipopuri:A7@nykaa.8vv9hop.mongodb.net/DynamicUserCRUD?appName=DynamicUserCRUD_collect

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### How to Add New Fields to the Form

This application uses a configuration-driven approach, meaning form fields and table columns are generated dynamically from a configuration file

Files to update:
frontend/app/config/formConfig.ts

backend/src/models/User.ts

## Tech Stack

### Frontend

Next.js 16
TypeScript
Tailwind CSS

### Backend

Node.js
Express.js
MongoDB
Mongoose
