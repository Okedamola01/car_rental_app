const Vehicle = require('../model/Vehicle');

//createNewVehicle: Accepts vehicle Maker, Model, Year and  Color in the req.body to save in the DB
const createNewVehicle = async (req, res) =>
{
    if (!req?.body?.maker || !req?.body?.model || !req?.body?.year || !req?.body?.color)
    {
        return res.status(400).json({'message': 'Vehicle maker, model, year and color required!'});
    }

    try {
        const result = await Vehicle.create({
            maker: req.body.maker,
            model: req.body.model,
            year: req.body.year,
            color: req.body.color
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

//updateVehicle: Accepts a vehicle ID in the req.param and option of whichever vehicle property that needs updating in the vehicle
const updateVehicle = async (req, res) =>
{
    if (!req?.params?.id)
    {
        return res.status(400).json({ 'message': 'ID parameter required!' });
    }

    const vehicle = await Vehicle.findOne({ _id: req.params.id }).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.params.id}!`});
    }
    if (req.body?.maker) vehicle.maker = req.body.maker;
    if (req.body?.model) vehicle.model = req.body.model;
    if (req.body?.year) vehicle.year = req.body.year;
    if (req.body?.color) vehicle.color = req.body.color;
    const result = await vehicle.save();
    res.json(result);
}

//deleteVehicle: Accepts a vehicle ID in the req.param and deletes the vehicle from the DB
const deleteVehicle = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({'message': 'Vehicle ID required!'});

    const vehicle = await Vehicle.findOne({ _id: req.params.id }).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.params.id}!`});
    }
    const result = await vehicle.deleteOne({_id: req.params.id});
    res.json(result);
}


//getVehicle: Accepts a vehicle ID in the req.param and fetches the corresponding vehicle and its properties from the DB
const getVehicle = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({'message': 'Vehicle ID required!'});

    const vehicle = await Vehicle.findOne({_id: req.params.id}).exec();
    if (!vehicle)
    {
        return res.status(404).json({"message": `No vehicle matches ID ${req.params.id}!`});
    }
    res.json(vehicle);
}

//getAllVehicles: fetches all vehicles and their properties from the DB
const getAllVehicles = async (req, res) =>
{
    const vehicles = await Vehicle.find();
    if (!vehicles) return res.status(204).json({'message': 'No vehicles found!'});
    res.json(vehicles);
}



module.exports = {getAllVehicles, createNewVehicle, updateVehicle, deleteVehicle, getVehicle};