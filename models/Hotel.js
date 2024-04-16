import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
