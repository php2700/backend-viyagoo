import mongoose from "mongoose";

const futureMobilitySchema = new mongoose.Schema({
    description:
    {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const FutureMobilityModel = mongoose.model('futureMobility', futureMobilitySchema)
export default FutureMobilityModel;



