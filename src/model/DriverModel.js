import mongoose from "mongoose";

// --- 1. Schema for User Form Submission ---
const driverInquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  city: String,
  email: String,
  altPhone: String,
  vehicleType: String,
  additionalInfo: String,
}, { timestamps: true });

// Note: Yahan 'export const' lagana zaroori hai
export const DriverInquiry = mongoose.model("DriverInquiry", driverInquirySchema);


// --- 2. Schema for Page Content ---
const driverPageSchema = new mongoose.Schema({
  topTitle: { type: String, default: "Drive the Future with Viyagoo" },
  topDescription: { type: String, default: "" }, 
  bottomTitle: { type: String, default: "Got a Vehicle?" },
  bottomDescription: { type: String, default: "" },
  bottomImage: { type: String, default: "" }, 
});

// Note: Yahan bhi 'export const' lagana zaroori hai
export const DriverPage = mongoose.model("DriverPage", driverPageSchema);