# Portfolio Backend

This is the backend server for the portfolio website that handles contact form submissions, stores data in MongoDB, and sends email notifications.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root of the backend directory with the following:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
EMAIL_USER=your_email_here
EMAIL_PASS=your_app_password_here
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/contact` - Submit a contact form

## Features

- MongoDB integration for storing contact form submissions
- Email notifications using Nodemailer
- CORS support for frontend integration