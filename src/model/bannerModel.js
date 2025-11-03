import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true
})

const BannerModel = mongoose.model('banner', bannerSchema)
export default BannerModel;



