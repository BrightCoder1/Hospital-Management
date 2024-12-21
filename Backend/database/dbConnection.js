import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = () => {
    mongoose.connect(
        process.env.MONGO_URL,{
            dbName:"Hospital_Management_System"
        }
    ).then(() => {
        console.log("Database Connected");
    }).catch((err) => {
        console.log("Database Connection Error: ",err);
    })
};