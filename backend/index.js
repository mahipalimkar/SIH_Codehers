import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Enable CORS for all origins (development)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//variables to connect to mongodb
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI;

try {
  await mongoose.connect(URI);
  console.log("conencted to mongodb");
} catch (error) {
  console.log("error", error);
}

//defining routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

//cloudinary configuration code
// Cloudinary helps store images as so that they can be stored in backedn as a url and rendered in frontend
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
