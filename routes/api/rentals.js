const express = require('express');
const router = express.Router();
const rentalController = require('../../controllers/rentalController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(rentalController.getAllRentals)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), rentalController.createNewRental)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), rentalController.updateRental)
    .delete(verifyRoles(ROLES_LIST.Admin), rentalController.deleteRental);

router.route('/:id')
    .get(rentalController.getRental);

module.exports = router;