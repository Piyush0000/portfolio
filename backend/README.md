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
MONGODB_URI=mongodb+srv://piyushrathore:piyushcodes@cluster0.wiqfcjk.mongodb.net/shopify_mongo?retryWrites=true&w=majority&appName=Cluster0
EMAIL_USER=rathorepiyush0000@gmail.com
EMAIL_PASS=voli bjar dlxh zgbg
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