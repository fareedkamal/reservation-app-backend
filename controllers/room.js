import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    room.img = `/room_${Math.floor(Math.random() * 10) + 1}.jpg`;
    await room.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({ hotel_id: req.params.hotel_id });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};
