import Hotel from "../models/Hotel.js";
import Chance from "chance";
const chance = new Chance();

export const createHotel = async (req, res) => {
  console.log("asdasd");
  try {
    const hotel = new Hotel(req.body);
    hotel.img = `/hotel_${Math.floor(Math.random() * 10) + 1}.jpg`;
    hotel.phone = chance.phone();
    await hotel.save();
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const searchHotels = async (req, res) => {
  let { input } = req.params;
  input = input.charAt(0).toUpperCase() + input.slice(1);
  console.log(input);
  try {
    const hotels = await Hotel.find({
      $or: [{ city: input }, { country: input }],
    });
    if (hotels.length === 0) {
      return res.status(404).json("No hotels found for the given location.");
    }
    res.json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
