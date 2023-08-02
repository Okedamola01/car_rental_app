const express = require('express');
const router = express.Router();
const rentalController = require('../../controllers/rentalController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(rentalController.getAllRentals)
    .delete(verifyRoles(ROLES_LIST.Admin), rentalController.deleteAllRentals)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), rentalController.createNewRental);

router.route('/:id')
    .get(rentalController.getRental)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), rentalController.updateRental)
    .delete(verifyRoles(ROLES_LIST.Admin), rentalController.deleteRental);

module.exports = router;