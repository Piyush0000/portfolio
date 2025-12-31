import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { ContactForm } from './models/ContactForm.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://www.piyushdevs.space',
    'https://piyushdevs.space',
    'https://portfolio-frontend.vercel.app', // Add your Vercel URL if different
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://piyushrathore:piyushcodes@cluster0.wiqfcjk.mongodb.net/shopify_mongo?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Nodemailer transporter for email notifications
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'rathorepiyush0000@gmail.com',
    pass: process.env.EMAIL_PASS || 'voli bjar dlxh zgbg' // This should be your app password
  }
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create new contact form submission
    const newContactForm = new ContactForm({
      name,
      email,
      subject,
      message,
      submittedAt: new Date()
    });

    // Save to MongoDB
    const savedForm = await newContactForm.save();

    // Send email notification
    const mailOptions = {
      from: 'rathorepiyush0000@gmail.com',
      to: 'rathorepiyush0000@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This is an automated message from your portfolio website.</em></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      data: savedForm 
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;