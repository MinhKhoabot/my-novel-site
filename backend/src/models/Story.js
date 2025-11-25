// backend/src/models/Story.js
import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["ongoing", "completed", "draft"],
      default: "ongoing"
    },
    coverImageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Story = mongoose.model("Story", storySchema);
