import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const userRegistered = await User.findOne({ email: req.body.email });
  if (userRegistered) {
    res.status(400).send("User already registered with this email.");
    return;
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      country: req.body.country,
    });
    await user.save();
    res.status(200).send("User successfuly registered.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User does not exist.");
      return;
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(400).send("Password is incorrect.");
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    delete user._doc.password;
    user._doc["token"] = token;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
