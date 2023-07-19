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

const updateRental = async (req, res) =>
{
  if(!req?.body?.id)
  {
    return res.status(400).json({'message': "ID parameter required"});
  }

  const rental = await Rental.findOne({_id: req.body.id}).exec();
  if (!rental)
    {
        return res.status(204).json({"message": `No rental matches ID ${req.body.id}!`});
    }
    if (req.body?.user) rental.user = req.body.user;
    if (req.body?.vehicle) rental.vehicle = req.body.vehicle;
    if (req.body?.startDate) rental.startDate = req.body.startDate;
    if (req.body?.endDate) rental.endDate = req.body.endDate;
    const result = await rental.save();
    res.json(result);
}

const deleteRental = async (req, res) =>
{
    if (!req?.body?.id) return res.status(400).json({'message': 'Rental ID required!'});

    const rental = await Rental.findOne({ _id: req.body.id }).exec();
    if (!rental)
    {
        return res.status(204).json({"message": `No rental matches ID ${req.body.id}!`});
    }
    const result = await rental.deleteOne({_id: req.body.id});
    res.json(result);
}


const getRental = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({'message': 'Rental ID required!'});

    const rental = await Rental.findOne({_id: req.params.id}).exec();
    if (!rental)
    {
        return res.status(204).json({"message": `No rental matches ID ${req.params.id}!`});
    }
    res.json(rental);
}

const getAllRentals = async (req, res) =>
{
  const rentals = await Vehicle.find();
  if (!rentals) return res.status(201).json({ 'message': 'No employees found.' });
  res.json(rentals);
}

module.exports = {
  createNewRental,
  getAllRentals,
  updateRental,
  deleteRental,
  getRental
};
