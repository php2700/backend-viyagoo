import mongoose from "mongoose";

const logisticSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    mainTitle: {
        type: String,
        required: false
    },
    processHeading: {
        type: String,
        required: false
    },
    viyagooHeading: {
        type: String,
        required: false
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
    ourProcessImage: {
        type: String,
        required: true
    },
    ourProcessTitle: {
        type: [String],
        required: true
    },
    whyViyagooImage: {
        type: String,
        required: true
    },
    whyViyagoo: [
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
    ]
}, {
    timestamps: true
})

const LogisticModel = mongoose.model('logistic', logisticSchema)
export default LogisticModel;



