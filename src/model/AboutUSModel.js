import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    // 1. Top Intro Paragraph
    description: { type: String, default: "" },
    
    // 2. Middle Content (White Box)
    subDescription: { type: String, default: "" },

    // 3. Vision Section
    visionTitle: { type: String, default: "Vision Statement" },
    visionDesc: { type: String, default: "" },

    // 4. Mission Section
    missionTitle: { type: String, default: "Mission Statement" },
    missionDesc: { type: String, default: "" },
  },
  { timestamps: true }
);

export const AboutUSModel = mongoose.model("About", aboutSchema);