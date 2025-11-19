import mongoose from "mongoose";

const chauferEdgeDetailSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ChauferEdgeDetailModel = mongoose.model('chauferEdgeDetail', chauferEdgeDetailSchema)
export default ChauferEdgeDetailModel;



