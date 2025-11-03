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



