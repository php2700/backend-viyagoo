import mongoose from "mongoose";

const chauferSchema = new mongoose.Schema({
    description: {
        type: [String],
        required: true
    },
    mobilityHeading: {
        type: String,
        required: true
    },
    mobility: [
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
}, {
    timestamps: true
})

const ChauferModel = mongoose.model('chaufer', chauferSchema)
export default ChauferModel;



