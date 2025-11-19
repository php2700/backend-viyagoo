import mongoose from "mongoose";

const segmentFleetSchema = new mongoose.Schema({
    image: {
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

const SegmentFleetModel = mongoose.model('segmentFleet', segmentFleetSchema)
export default SegmentFleetModel;



