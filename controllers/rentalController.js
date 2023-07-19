const Rental = require('../model/Rental');
const Vehicle = require('../model/Vehicle');
const User = require('../model/User');

const createNewRental = async (req, res) => {
  try {
    const { user, vehicle, startDate, endDate, rentalFee } = req.body;

    // Create a new rental instance using the Rental model
    const rental = new Rental({
      user,
      vehicle,
      startDate,
      endDate,
      rentalFee,
    });

    // Save the rental to the database
    const savedRental = await rental.save();

    res.status(201).json(savedRental);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create rental" });
  }
};

const getAllRentals = async (req, res) =>
{
  const rentals = await Vehicle.find();
  if (!rentals) return res.status(201).json({ 'message': 'No employees found.' });
  res.json(rentals);
}

module.exports = {
  createNewRental,
  getAllRentals
};
