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



