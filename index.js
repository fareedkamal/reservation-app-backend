import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import roomRoutes from "./routes/room.js";
import hotelRoutes from "./routes/hotel.js";
import reservationRoutes from "./routes/reservation.js";
import eventRoutes from "./routes/event.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();
const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected!");
  } catch (error) {
    throw error;
  }
};

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);

app.listen(3000, () => {
  db_connect();
  console.log("Connected to Server!");
});
