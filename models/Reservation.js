import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    hotel_name: {
      type: String,
      required: true,
    },
    hotel_address: {
      type: String,
      required: true,
    },
    room_title: {
      type: String,
      required: true,
    },
    room_id: {
      type: String,
      required: true,
    },
    hotel_id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
