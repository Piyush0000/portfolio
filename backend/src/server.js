import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { ContactForm } from './models/ContactForm.js';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

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

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message || !subject) {
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

    // Send email notification using Resend
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ["rathorepiyush0000@gmail.com"],
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Message sent'
    });

  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Email failed' 
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