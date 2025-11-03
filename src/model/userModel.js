import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: false,
        default: 'user',
        enum: ['user']
    },
}, {
    timestamps: true
})

const userModel = mongoose.model('user', userSchema)
export default userModel;



