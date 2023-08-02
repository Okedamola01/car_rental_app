const Rental = require('../model/Rental');
const Vehicle = require('../model/Vehicle');
const User = require('../model/User');

//createNewRental: Accepts vehicleID, rental start and end date and the rentalfee in the req.body and retrieves the user info of the user making the req from the req.body and adds the user's id to create the rental instance
const createNewRental = async (req, res) => {
  try {
    const { vehicle, startDate, endDate, rentalFee } = req.body;
    const author = await User.findOne({username: req.username}).exec();

    // Create a new rental instance using the Rental model
    const rental = new Rental({
      user: author._id,
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

//updateRental: Accepts a rental ID in the req.param and option of whichever rental property that needs updating in the req.body and saves the update in DB
const updateRental = async (req, res) =>
{
  try {
    if(!req?.params?.id)
  {
    return res.status(400).json({'message': "Rental ID required"});
  }

  const rental = await Rental.findOne({_id: req.params.id}).exec();
  if (!rental)
    {
        return res.status(204).json({"message": `No rental matches ID ${req.params.id}!`});
    }
    if (req.body?.user) rental.user = req.body.user;
    if (req.body?.vehicle) rental.vehicle = req.body.vehicle;
    if (req.body?.startDate) rental.startDate = req.body.startDate;
    if (req.body?.endDate) rental.endDate = req.body.endDate;
    const result = await rental.save();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update rental!' });
  }
}

//deleteRental: Accepts a rental ID in the req.param and deletes it from the DB
const deleteRental = async (req, res) =>
{
    if (!req?.params?.id)
    {
      return res.status(400).json({'message': 'Rental ID required!'});
    }

    const rental = await Rental.findOne({ _id: req.params.id }).exec();
    if (!rental)
    {
        return res.status(204).json({"message": `No rental matches ID ${req.params.id}!`});
    }
    const result = await rental.deleteOne({_id: req.params.id});
    res.json(result);
}

//getRental: Accepts a rental ID in the req.param and retrieves the rental property from the DB while also populating the user and vehicle property with their respective info 
const getRental = async (req, res) => {
  try {
      if (!req?.params?.id) {
          return res.status(400).json({ 'message': 'Rental ID required!' });
      }

      const rental = await Rental.findOne({ _id: req.params.id })
          .populate('user', 'username')
          .populate('vehicle', 'maker model year color')
          .exec();

      if (!rental) {
          return res.status(204).json({ "message": `No rental matches ID ${req.params.id}!` });
      }

      res.json(rental);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get rental!' });
  }
}

//getAllRentals: Retrieves all rentals form the DB and populates all necessary fields
const getAllRentals = async (req, res) =>
{
  try {
    const rentals = await Rental.find()
  .populate('user', 'username')
  .populate('vehicle', 'maker model year color');
  if (!rentals) return res.status(404).json({ 'message': 'No rentals found!' });
  res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to get rentals!'})
  }
}

//deleteAllRentals: deletes all rentals in the DB
const deleteAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().exec();
    if (rentals.length === 0) {
      return res.status(404).json({ message: 'No rentals found' });
    }
    
    const result = await Rental.deleteMany();
    res.json({ message: 'All rentals deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete all rentals' });
  }
};

module.exports = {
  createNewRental,
  getAllRentals,
  updateRental,
  deleteRental,
  deleteAllRentals,
  getRental
};
