const express = require('express');
const router = express.Router();
const vehiclesController = require('../../controllers/vehiclesController');
const rentalController = require('../../controllers/rentalController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(vehiclesController.getAllVehicles)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), vehiclesController.createNewVehicle)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), vehiclesController.updateVehicle)
    .delete(verifyRoles(ROLES_LIST.Admin), vehiclesController.deleteVehicle)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), rentalController.rentVehicle);

router.route('/:id')
    .get(vehiclesController.getVehicle)
    

module.exports = router;