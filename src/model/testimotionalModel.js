import mongoose from "mongoose";

const testImotioanlSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const TestImotionalModel = mongoose.model('testimotional', testImotioanlSchema)
export default TestImotionalModel;



const testimonialheadingSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const TestimonialHeadingModel = mongoose.model('TestimonialHeading', testimonialheadingSchema)


