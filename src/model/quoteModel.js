import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    pickupDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ['Airport', 'Local', 'Outstation']
    }
}, {
    timestamps: true
})

const QuoteModel = mongoose.model('quote', quoteSchema)
export default QuoteModel;



