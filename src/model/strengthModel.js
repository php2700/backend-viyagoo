import mongoose from "mongoose";

const strengthSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const StrengthModel = mongoose.model('strength', strengthSchema)
export default StrengthModel;

const headingSchema = new mongoose.Schema({
        heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const StrengthHeadingModel = mongoose.model('strengthHeading', headingSchema)

