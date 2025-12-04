import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema({
    about: {
        type: String,
        required: true
    },
    aboutHeading: {
        type: String,
        required: true
    },
    evAdvantageHeading: {
        type: String,
        required: true
    },
    evAdvantage: {
        type: String,
        required: true
    },
    services: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]

}, {
    timestamps: true
})

const SegmentModel = mongoose.model('segment', segmentSchema)
export default SegmentModel;



const serviceBannerSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },


}, {
    timestamps: true
})

export const ServiceBannerModel = mongoose.model('serviceBanner', serviceBannerSchema)