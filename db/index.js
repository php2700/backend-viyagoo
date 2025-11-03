import mongoose from "mongoose";

// password=c2E9JFPWBF0SOoPR
// const suername=designer1dbvertex_db_user
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTDB)
        console.log("connected")
    } catch (error) {
        process.exit(1)
    }
}

export default connectDb;