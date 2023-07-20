const Rental = require("../model/Rental");
const Vehicle = require("../model/Vehicle");
const User = require("../model/User");

const createRental = async (req, res) => {
  // You typed creteRental instead of createRental = You exported createRental which should be used in the route.
  try {
    const { vehicleId, startDate, endDate, rentalFee } = req.body;

    // Check if the vehicle ID is provided
    if (!vehicleId) {
      return res.status(400).json({ message: "Vehicle ID is required." });
    }

    // Find the vehicle based on the provided ID
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${vehicleId} not found.` });
    }

    // Create the rental
    const rental = new Rental({
      // user: req.user,
      user: req.user._id, // You adding the id of the user and not the entire user object. Remember that in the schema, the type is ObjectId.
      vehicle: vehicle._id,
      // startDate: req.body.startDate,
      startDate, // You have already pointed to the startDate and endDate from the req.body by destructuring, So you dont need to
      // repeate req.body again here. Simply use the destructured value. It should be like this - startDate : startDatre, but since the key and value
      // are the same, you can just use startDate.
      // endDate: req.body.endDate,
      endDate, //Same here
      rentalFee,
    });

    await rental.populate({
      path: "user",
      select: "-password -refreshToken",
    }).execPopulate();

    await rental.populate("vehicle").execPopulate();

    // Save the rental to the database
    const savedRental = await rental.save();

    res.status(201).json(savedRental);
<<<<<<< HEAD
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
  const rentals = await Rental.find();
  if (!rentals) return res.status(201).json({ 'message': 'No rentals found!' });
=======
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create rental." });
  }
};

const getAllRentals = async (req, res) => {
  const rentals = await Vehicle.find();
  if (!rentals) return res.status(201).json({ message: "No employees found." });
>>>>>>> 3728e4c (Added some comments)
  res.json(rentals);
};

module.exports = {
<<<<<<< HEAD
  createNewRental,
  getAllRentals,
  updateRental,
  deleteRental,
  getRental
=======
  createRental,
  getAllRentals,
>>>>>>> 3728e4c (Added some comments)
};
