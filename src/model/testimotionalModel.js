import mongoose from "mongoose";

const testImotioanlSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
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

const TestImotionalModel = mongoose.model('testimotional', testImotioanlSchema)
export default TestImotionalModel;



