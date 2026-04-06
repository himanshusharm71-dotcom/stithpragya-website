/* eslint-env node */
/* global process, __dirname */

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 5000;
const mediaFile = path.join(__dirname, "media.json");

/* -------------------- helpers -------------------- */

const ensureMediaFile = () => {
  try {
    if (!fs.existsSync(mediaFile)) {
      fs.writeFileSync(mediaFile, JSON.stringify([], null, 2), "utf8");
    }
  } catch (error) {
    console.error("Error creating media file:", error);
  }
};

ensureMediaFile();

const readMedia = () => {
  try {
    const raw = fs.readFileSync(mediaFile, "utf8");

    if (!raw || !raw.trim()) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Read media error:", error);
    return [];
  }
};

const writeMedia = (data) => {
  try {
    fs.writeFileSync(mediaFile, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Write media error:", error);
    return false;
  }
};

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const normalizeString = (value) =>
  typeof value === "string" ? value.trim() : "";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidUrl = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
};

const escapeHtml = (value) => {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char] || char;
  });
};

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS is missing in .env");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const transporter = createTransporter();

if (transporter) {
  transporter.verify((error, success) => {
    console.log("EMAIL_USER:", process.env.EMAIL_USER || "Not set");
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    if (error) {
      console.error("Mail transporter error:", error);
    } else {
      console.log("Mail transporter ready:", success);
    }
  });
}

/* -------------------- routes -------------------- */

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/media", (req, res) => {
  try {
    const media = readMedia();
    res.json({ success: true, media });
  } catch (error) {
    console.error("Get media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/send-enquiry", async (req, res) => {
  try {
    const name = normalizeString(req.body.name);
    const email = normalizeString(req.body.email);
    const phone = normalizeString(req.body.phone);
    const course = normalizeString(req.body.course);
    const message = normalizeString(req.body.message);

    if (!name || !email || !phone || !course || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured properly",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Enquiry - Stithpragya Music Academy",
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Course:</strong> ${escapeHtml(course)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      `,
    });

    res.json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("Send enquiry error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/send-teacher", async (req, res) => {
  try {
    const name = normalizeString(req.body.name);
    const email = normalizeString(req.body.email);
    const phone = normalizeString(req.body.phone);
    const skill = normalizeString(req.body.skill);
    const experience = normalizeString(req.body.experience);
    const message = normalizeString(req.body.message);

    if (!name || !email || !phone || !skill || !experience || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    if (!transporter) {
      return res.status(500).json({
        success: false,
        message: "Email service is not configured properly",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Teacher Application - Stithpragya Music Academy",
      html: `
        <h2>New Teacher Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Teaching Skill:</strong> ${escapeHtml(skill)}</p>
        <p><strong>Experience:</strong> ${escapeHtml(experience)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      `,
    });

    res.json({
      success: true,
      message: "Teacher application submitted successfully",
    });
  } catch (error) {
    console.error("Send teacher error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/verify-password", (req, res) => {
  try {
    const password = normalizeString(req.body.password);

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (!process.env.ADMIN_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Admin password is not configured",
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
    console.error("Verify password error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/add-media", (req, res) => {
  try {
    const password = normalizeString(req.body.password);
    const type = normalizeString(req.body.type);
    const title = normalizeString(req.body.title);
    const url = normalizeString(req.body.url);

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

    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
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

    const saved = writeMedia(media);
    if (!saved) {
      return res.status(500).json({
        success: false,
        message: "Could not save media",
      });
    }

    res.json({
      success: true,
      media: newItem,
    });
  } catch (error) {
    console.error("Add media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

app.post("/admin/delete-media", (req, res) => {
  try {
    const password = normalizeString(req.body.password);
    const rawId = req.body.id;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (rawId === undefined || rawId === null || rawId === "") {
      return res.status(400).json({
        success: false,
        message: "Media id is required",
      });
    }

    const id = Number(rawId);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid media id",
      });
    }

    const media = readMedia();
    const updatedMedia = media.filter((item) => Number(item.id) !== id);

    if (updatedMedia.length === media.length) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    const saved = writeMedia(updatedMedia);
    if (!saved) {
      return res.status(500).json({
        success: false,
        message: "Could not delete media",
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Delete media error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Server error",
    });
  }
});

/* -------------------- 404 -------------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* -------------------- server -------------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});