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
    whatSetImage: { type: String, default: "" },
    vehicleIcon: { type: String, default: "" },
    safetyIcon: { type: String, default: "" },
    tripIcon: { type: String, default: "" },
    tripDailyIcon: { type: String, default: "" },
    whatSetDescription: { type: String, default: "" },
    vehicles: { type: String, default: "" },
    sefety: { type: String, default: "" },
    trips: { type: String, default: "" },
    dailyTrip: { type: String, default: "" },
  },
  { timestamps: true }
);

export const AboutUSModel = mongoose.model("About", aboutSchema);

const aboutBannerSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
  

}, {
    timestamps: true
})

const AboutBannerModel = mongoose.model('aboutBanner', aboutBannerSchema)
export default AboutBannerModel;