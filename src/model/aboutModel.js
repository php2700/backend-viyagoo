import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    heading:{
         type: String,
        required: false
    }
}, {
    timestamps: true
})

const AboutModel = mongoose.model('about', aboutSchema)
export default AboutModel;



