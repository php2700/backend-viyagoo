import mongoose from "mongoose";

const whyTransportationSchema = new mongoose.Schema({
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

const WhytransportationModel = mongoose.model('whyTransportation', whyTransportationSchema)
export default WhytransportationModel;

const whyTransportationHeadingSchema = new mongoose.Schema({
 
    heading: {
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

export const TransportHeadingModel = mongoose.model('transportHeading', whyTransportationHeadingSchema)

