import mongoose from "mongoose";

const savingSchema = new mongoose.Schema({
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

const SavingModel = mongoose.model('saving', savingSchema)
export default SavingModel;



const securitySchema = new mongoose.Schema({
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

export const SecurityModel = mongoose.model('security', securitySchema)




