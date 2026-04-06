/* eslint-env node */
/* global process, __dirname */

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "https://stithpragya-website.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;
const mediaFile = path.join(__dirname, "media.json");

if (!fs.existsSync(mediaFile)) {
  fs.writeFileSync(mediaFile, JSON.stringify([], null, 2), "utf8");
}

const readMedia = () => {
  try {
    const raw = fs.readFileSync(mediaFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.log("Read media error:", error);
    return [];
  }
};

const writeMedia = (data) => {
  fs.writeFileSync(mediaFile, JSON.stringify(data, null, 2), "utf8");
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  family: 4,
});

transporter.verify((error, success) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  if (error) {
    console.log("Mail transporter error:", error);
  } else {
    console.log("Mail transporter ready:", success);
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/media", (req, res) => {
  try {
    const media = readMedia();
    res.json({ success: true, media });
  } catch (error) {
    console.log("Get media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/send-enquiry", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: `"Stithpragya Music Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Enquiry - Stithpragya Music Academy",
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.log("Send enquiry error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/send-teacher", async (req, res) => {
  try {
    const { name, email, phone, skill, experience, message } = req.body;

    if (!name || !email || !phone || !skill || !experience || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await transporter.sendMail({
      from: `"Stithpragya Music Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Teacher Application - Stithpragya Music Academy",
      html: `
        <h2>New Teacher Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Teaching Skill:</strong> ${skill}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Teacher application submitted successfully",
    });
  } catch (error) {
    console.log("Send teacher error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/verify-password", (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password === process.env.ADMIN_PASSWORD) {
      return res.json({ success: true });
    }

    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });
  } catch (error) {
    console.log("Verify password error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/add-media", (req, res) => {
  try {
    const { password, type, title, url } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!type || !title || !url) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const media = readMedia();

    const newItem = {
      id: Date.now(),
      type,
      title,
      url,
      createdAt: new Date().toISOString(),
    };

    media.unshift(newItem);
    writeMedia(media);

    res.json({
      success: true,
      media: newItem,
    });
  } catch (error) {
    console.log("Add media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/delete-media", (req, res) => {
  try {
    const { password, id } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Media id is required",
      });
    }

    const media = readMedia();
    const updatedMedia = media.filter((item) => item.id !== id);

    writeMedia(updatedMedia);

    res.json({ success: true });
  } catch (error) {
    console.log("Delete media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});