# Deployment Guide

This guide explains how to deploy the portfolio website with both frontend and backend.

## Deploy Backend to Render

1. Push your code to a GitHub repository
2. Go to [Render](https://render.com) and connect your GitHub account
3. Create a new Web Service
4. Select your repository
5. Set the environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `EMAIL_USER`: Your email address (e.g., rathorepiyush0000@gmail.com)
   - `EMAIL_PASS`: Your email app password
6. The build command is `npm install`
7. The start command is `npm start`
8. The environment is Node.js

After deployment, you'll get a URL like `https://your-app-name.onrender.com`. Note this URL as you'll need it for the frontend deployment.

## Deploy Frontend to Vercel

1. Push your code to a GitHub repository (if not already done)
2. Go to [Vercel](https://vercel.com) and connect your GitHub account
3. Create a new project and select your repository
4. No need to modify the vercel.json file as it's already updated with your backend URL
5. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: https://portfolio-s8gp.onrender.com (your deployed backend URL)
6. The build command is `npm run build`
7. The output directory is `dist`

## Environment Variables

### Backend (Render)
- `MONGODB_URI`: MongoDB connection string
- `EMAIL_USER`: Email address for notifications
- `EMAIL_PASS`: App password for email

### Frontend (Vercel)
- `VITE_API_URL`: Your Render backend URL (https://portfolio-s8gp.onrender.com)

## Notes

- The contact form will store submissions in MongoDB and send email notifications
- The thank you modal will appear after successful form submission
- CORS is configured to allow requests from your frontend domain