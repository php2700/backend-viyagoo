import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
    description: {
        type: [String],
        required: true
    },
    growingChallenge: {
        type: [String],
        required: true
    },
    title1: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    title2: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    title3: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    description3: {
        type: String,
        required: true
    },
    title4: {
        type: String,
        required: true
    },
    image4: {
        type: String,
        required: true
    },
    description4: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const TransportationModel = mongoose.model('transportation', transportationSchema)
export default TransportationModel;



