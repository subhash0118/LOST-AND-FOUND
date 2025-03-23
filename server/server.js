require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // For sending OTP emails

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// User Schema - Updated with additional fields
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    rollNumber: { type: String },
    mobileNumber: { type: String },
    yearOfStudy: { type: String },
    branch: { type: String }
});

const User = mongoose.model('User', UserSchema);

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Send OTP Endpoint
app.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email.endsWith("@gitam.in")) {
            return res.status(400).json({ message: "Only @gitam.in emails are allowed" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

        await User.updateOne({ email }, { otp, otpExpires }, { upsert: true });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Registration",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error in sending OTP:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Verify OTP Endpoint
app.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        await User.updateOne({ email }, { otp: null, otpExpires: null });

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error in verifying OTP:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.updateOne({ email }, { username, password: hashedPassword, otp: null, otpExpires: null });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!email.endsWith("@gitam.in")) {
            return res.status(400).json({ message: "Only @gitam.in emails are allowed" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Get User Profile Endpoint
app.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -otp -otpExpires');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Update User Profile Endpoint
app.put('/user/update-profile', verifyToken, async (req, res) => {
    try {
        const { username, rollNumber, mobileNumber, yearOfStudy, branch } = req.body;
        
        // Find user and update
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { 
                username, 
                rollNumber, 
                mobileNumber, 
                yearOfStudy, 
                branch 
            },
            { new: true }
        ).select('-password -otp -otpExpires');
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Root Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));