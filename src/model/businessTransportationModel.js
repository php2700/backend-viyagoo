import mongoose from "mongoose";

const businessTransportationSchema = new mongoose.Schema({
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

const BusinessTransportationModel = mongoose.model('businessTransportation', businessTransportationSchema)
export default BusinessTransportationModel;




const businessTransportationHeadingSchema = new mongoose.Schema({
 
    heading: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
     description2: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export const BusinessHeadingModel = mongoose.model('business', businessTransportationHeadingSchema)