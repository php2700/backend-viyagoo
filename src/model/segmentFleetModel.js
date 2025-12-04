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




const fleetHeadingSchema = new mongoose.Schema({
        heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const FleetHeadingModel = mongoose.model('fleetHeading', fleetHeadingSchema)
