import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema({
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
    },

}, {
    timestamps: true
})

const BenefitModel = mongoose.model('benefit', benefitSchema)
export default BenefitModel;



