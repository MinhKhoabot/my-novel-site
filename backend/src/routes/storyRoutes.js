// backend/src/routes/storyRoutes.js
import express from "express";
import { Story } from "../models/Story.js";
import { Chapter } from "../models/Chapter.js";

const router = express.Router();

// Lấy danh sách truyện + filter theo tag & search
router.get("/", async (req, res) => {
  try {
    const { tag, search } = req.query;
    const filter = {};

    if (tag) filter.tags = tag;
    if (search) filter.title = { $regex: search, $options: "i" };

    const stories = await Story.find(filter)
      .sort({ updatedAt: -1 })
      .select("title slug description tags status coverImageUrl updatedAt");

    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy thông tin 1 truyện
router.get("/:slug", async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug });
    if (!story) return res.status(404).json({ message: "Story not found" });

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy danh sách chương của 1 truyện
router.get("/:slug/chapters", async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug });
    if (!story) return res.status(404).json({ message: "Story not found" });

    const chapters = await Chapter.find({ story: story._id })
      .sort({ number: 1 })
      .select("number title updatedAt");

    res.json({ storyId: story._id, chapters });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy nội dung của 1 chương
router.get("/:slug/chapters/:number", async (req, res) => {
  try {
    const story = await Story.findOne({ slug: req.params.slug });
    if (!story) return res.status(404).json({ message: "Story not found" });

    const chapter = await Chapter.findOne({
      story: story._id,
      number: Number(req.params.number)
    });

    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    res.json({ story, chapter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
