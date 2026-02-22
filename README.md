# MERN User CRUD Application
Live : https://dynamicrudexpressfrontend.vercel.app/

Backend: https://dynamicrudexpressbackend.vercel.app/

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
MONGO_URI=mongodb+srv://srisruthipopuri:<_password_>@nykaa.8vv9hop.mongodb.net/DynamicUserCRUD?appName=DynamicUserCRUD_collect

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## How to Add New Fields to the Form

In this application I have added form fields and table columns which are generated dynamically from a configuration file.

Files to update:
frontend/app/config/formConfig.ts

backend/src/models/User.ts

### To add a new field (example: Date of Birth)

### Step 1 — Update Frontend Configuration

Open: client/app/config/formConfig.ts

Add a new field object inside `userFormFields`:

```ts
{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: false
}
```

The form and table will automatically show this new field.

### Step 2 — Update Backend Schema

Open: backend/src/models/User.ts

Add the new field inside the Mongoose schema:

```ts
dob: { type: Date }
```

## Assumptions

- Components are modularized (UserForm, UserTable, Spinner).
- Frontend validation is implemented using required rules and regex   patterns.
- Backend validation is enforced via Mongoose schema.
- Spinner component used for API calls.
- Form submission button is disabled during processing to prevent duplicate requests.
- Basic error handling is implemented.
- MongoDB is accessed from MongoDB Atlas.
- Cancel option provided during edit mode to discard changes.
