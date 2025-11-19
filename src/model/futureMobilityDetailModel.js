import mongoose from "mongoose";

const futureMobilityDetailSchema = new mongoose.Schema({
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

const FutureMobilityDetailModel = mongoose.model('mobilityDetail', futureMobilityDetailSchema)
export default FutureMobilityDetailModel;



