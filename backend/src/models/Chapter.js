// backend/src/models/Chapter.js
import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    story: { type: mongoose.Schema.Types.ObjectId, ref: "Story", required: true },
    number: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

// đảm bảo không trùng số chương trong 1 truyện
chapterSchema.index({ story: 1, number: 1 }, { unique: true });

export const Chapter = mongoose.model("Chapter", chapterSchema);
