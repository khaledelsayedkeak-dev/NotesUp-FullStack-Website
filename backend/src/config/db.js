import mangoose from "mongoose";
export const connectDB = async () => {
    try {
        await mangoose.connect(process.env.MANGO_URI);
        console.log("MANGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("ERROR: ", error);
        process.exit(1);
    }
}