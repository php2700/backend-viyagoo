import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    smallImage: {
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

const SetModel = mongoose.model('set', setSchema)
export default SetModel;



