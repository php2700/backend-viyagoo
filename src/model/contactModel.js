import mongoose from "mongoose";

const contacttSchema = new mongoose.Schema({
    email: {
        type: [String],
        required: true
    },
    mobile: {
        type: [String],
        required: true
    }, address: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const ContactModel = mongoose.model('contact', contacttSchema)
export default ContactModel;