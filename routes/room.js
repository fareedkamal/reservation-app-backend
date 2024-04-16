import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  getRoomsByHotel,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);
router.get("/hotel/:hotel_id", getRoomsByHotel);

export default router;
