const Vehicle = require('../model/Vehicle');
const getAllVehicles = async (req, res) =>
{
    const vehicles = await Vehicle.find();
    if (!vehicles) return res.status(204).json({'message': 'No vehicles found!'});
    res.json(vehicles);
}

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
        console.log(err);
    }
}

const updateVehicle = async (req, res) =>
{
    if (!req?.body?.id)
    {
        return res.status(400).json({ 'message': 'ID parameter required!' });
    }

    const vehicle = await Vehicle.findOne({ _id: req.body.id }).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.body.id}!`});
    }
    if (req.body?.maker) vehicle.maker = req.body.maker;
    if (req.body?.model) vehicle.model = req.body.model;
    if (req.body?.year) vehicle.year = req.body.year;
    if (req.body?.color) vehicle.color = req.body.color;
    const result = await vehicle.save();
    res.json(result);
}

const deleteVehicle = async (req, res) =>
{
    if (!req?.body?.id) return res.status(400).json({'message': 'Vehicle ID required!'});

    const vehicle = await Vehicle.findOne({ _id: req.body.id }).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.body.id}!`});
    }
    const result = await vehicle.deleteOne({_id: req.body.id});
    res.json(result);
}

const getVehicle = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({'message': 'Vehicle ID required!'});

    const vehicle = await Vehicle.findOne({_id: req.params.id}).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.params.id}!`});
    }
    res.json(vehicle);
}

const rentVehicle = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({'message': 'Vehicle ID required!'});

    const vehicle = await Vehicle.findOne({_id: req.params.id}).exec();
    if (!vehicle)
    {
        return res.status(204).json({"message": `No vehicle matches ID ${req.params.id}!`});
    }
    res.json(vehicle);
}


module.exports = {getAllVehicles, createNewVehicle, updateVehicle, deleteVehicle, getVehicle, rentVehicle};