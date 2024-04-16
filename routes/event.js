import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  getEventsByUser,
  updateEvent,
} from "../controllers/event.js";

const router = express.Router();

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEvent);
router.get("/", getEvents);
router.get("/user/:user_id", getEventsByUser);

export default router;
