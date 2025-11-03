import mongoose from "mongoose";

const strengthSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const StrengthModel = mongoose.model('strength', strengthSchema)
export default StrengthModel;



