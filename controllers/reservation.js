import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

export const createReservation = async (req, res) => {
  const new_reservation = new Reservation(req.body);
  try {
    await new_reservation.save();

    const _reservations = {
      reservation_id: new_reservation._id,
      check_in: new_reservation.check_in,
      check_out: new_reservation.check_out,
    };

    await Room.findByIdAndUpdate(new_reservation.room_id, {
      $push: { reservations: _reservations },
    });

    res.status(200).json("Reservation made successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    const _reservations = {
      reservation_id: reservation._id,
      check_in: reservation.check_in,
      check_out: reservation.check_out,
    };

    await Room.findOneAndUpdate(
      { "reservations.reservation_id": reservation._id },
      { $set: { "reservations.$": _reservations } }
    );

    res.status(200).json("Reservation updated successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteReservation = async (req, res) => {
  const { room_id } = await Reservation.findById(req.params.id);
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    await Room.findByIdAndUpdate(room_id, {
      $pull: { reservations: { reservation_id: req.params.id } },
    });

    res.status(200).json("Reservation has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user_id: req.params.user_id,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
};
