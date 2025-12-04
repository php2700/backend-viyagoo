import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const ClientModel = mongoose.model('client', clientSchema)
export default ClientModel;



const clientheadingSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

export const ClientHeadingModel = mongoose.model('ClientHeading', clientheadingSchema)