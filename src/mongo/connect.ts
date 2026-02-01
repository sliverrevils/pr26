import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pool";

export const connectDB = async (): Promise<boolean> => {
    if (mongoose.connections[0].readyState) return true;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`✅ DB - connecting to : ${MONGODB_URI}`);
        return true;
    } catch (error) {
        console.log(`❌ DB - ERROR connecting to : ${MONGODB_URI}`, error);
        return false;
    }
};
