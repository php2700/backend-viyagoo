import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    video: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true,
    },
    image:{
         type: String,
        required: false
    },
    type:{
          type: String,
          required:false,
          enum:['video','image'],
          default:'image'
    }

}, {
    timestamps: true
})

const BannerModel = mongoose.model('banner', bannerSchema)
export default BannerModel;



