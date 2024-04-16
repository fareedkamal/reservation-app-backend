import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPerson: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    hotel_id: {
      type: String,
      required: true,
    },
    reservations: [
      {
        reservation_id: String,
        check_in: Date,
        check_out: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
