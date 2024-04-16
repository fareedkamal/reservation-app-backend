import User from "../models/User.js";
import Reservation from "../models/Reservation.js";
import Event from "../models/Event.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const updatedUser = {
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      country: req.body.country,
    };
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Reservation.deleteMany({ user_id: req.params.id });
    await Event.deleteMany({ user_id: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
