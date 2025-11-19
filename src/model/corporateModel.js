import mongoose from "mongoose";

const corporateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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

const CorporateModel = mongoose.model('corporate', corporateSchema)
export default CorporateModel;



