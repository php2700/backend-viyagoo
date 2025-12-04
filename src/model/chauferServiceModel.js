import mongoose from "mongoose";

const chuaferServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    points:
    {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const ChauferServiceModel = mongoose.model('chauferService', chuaferServiceSchema)
export default ChauferServiceModel;


const chaufferHeadingSchema = new mongoose.Schema({
        heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const ChaufferHeadingModel = mongoose.model('chaufferHeading', chaufferHeadingSchema)
