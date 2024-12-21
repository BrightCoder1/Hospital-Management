import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 2000;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});