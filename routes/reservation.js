import express from "express";
import {
  createReservation,
  updateReservation,
  deleteReservation,
  getReservation,
  getReservations,
  getReservationsByUser,
} from "../controllers/reservation.js";

const router = express.Router();

router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.get("/:id", getReservation);
router.get("/", getReservations);
router.get("/user/:user_id", getReservationsByUser);

export default router;
