import mongoose from "mongoose";

const believeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    services: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    closingDescription: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const BelieveModel = mongoose.model('believe', believeSchema)
export default BelieveModel;



