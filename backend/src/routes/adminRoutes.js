// backend/src/routes/adminRoutes.js
import express from "express";
import { Story } from "../models/Story.js";
import { Chapter } from "../models/Chapter.js";

const router = express.Router();

// Middleware kiểm tra header admin
router.use((req, res, next) => {
  const secret = req.headers["x-admin-secret"];
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

// Tạo truyện
router.post("/stories", async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật truyện
router.put("/stories/:id", async (req, res) => {
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Xóa truyện + toàn bộ chương
router.delete("/stories/:id", async (req, res) => {
  try {
    await Chapter.deleteMany({ story: req.params.id });
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo chương
router.post("/stories/:storyId/chapters", async (req, res) => {
  try {
    const chapter = await Chapter.create({
      story: req.params.storyId,
      ...req.body
    });
    res.status(201).json(chapter);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật chương
router.put("/chapters/:id", async (req, res) => {
  try {
    const updated = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Xóa chương
router.delete("/chapters/:id", async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: "Chapter deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
