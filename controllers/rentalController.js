const Rental = require('../model/Rental');
const Vehicle = require('../model/Vehicle');
const User = require('../model/User');

const creteRental = async (req, res) => {
  try {
    const { vehicleId, startDate, endDate } = req.body;

    // Check if the vehicle ID is provided
    if (!vehicleId) {
      return res.status(400).json({ message: 'Vehicle ID is required.' });
    }

    // Find the vehicle based on the provided ID
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: `Vehicle with ID ${vehicleId} not found.` });
    }

    // Create the rental
    const rental = new Rental({
      user: req.user,  
      vehicle: vehicle._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });

    // Save the rental
    const savedRental = await rental.save();
    console.log(savedRental);
    res.status(201).json(savedRental);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create rental.' });
  }
};

const getAllRentals = async (req, res) =>
{
  const rentals = await Vehicle.find();
  if (!rentals) return res.status(201).json({ 'message': 'No employees found.' });
  res.json(rentals);
}

module.exports = {
  createRental,
  getAllRentals
};
