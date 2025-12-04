import mongoose from "mongoose";

const chauferEdgeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    edgeHeading:{
          type: String,
        required: true
    }

}, {
    timestamps: true
})

const ChauferEdgeModel = mongoose.model('chauferEdge', chauferEdgeSchema)
export default ChauferEdgeModel;



