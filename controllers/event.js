import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(200).json("Event booked successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Event updated successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getEventsByUser = async (req, res) => {
  try {
    const events = await Event.find({ user_id: req.params.user_id });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
};
