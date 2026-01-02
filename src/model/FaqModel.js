import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    heading: {
        type: String,
        default: "Frequently Asked Questions",
        required: false
    },
    subtitle: {
        type: String,
        default: "",
        required: false
    },
    faqs: [
        {
            question: {
                type: String,
                required: true,
                trim: true
            },
            answer: {
                type: String,
                required: true,
                trim: true
            },
            order: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true
});

const FAQModel = mongoose.model('faq', faqSchema);
export default FAQModel;