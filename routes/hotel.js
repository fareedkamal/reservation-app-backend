import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  searchHotels,
  updateHotel,
} from "../controllers/hotel.js";
const router = express.Router();

router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotel);
router.get("/", getHotels);
router.get("/search/:input", searchHotels);

export default router;
