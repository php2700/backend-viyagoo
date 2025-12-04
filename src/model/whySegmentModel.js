import mongoose from "mongoose";

const whySegmentSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const WhySegmentModel = mongoose.model('whysegment', whySegmentSchema)
export default WhySegmentModel;



const SegmentHeadingSchema = new mongoose.Schema({
        heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const WhySegmentHeadingModel = mongoose.model('WhySegmentHeading', SegmentHeadingSchema)