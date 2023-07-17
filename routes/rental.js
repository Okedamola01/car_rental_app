const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const verifyRoles = require("../middleware/verifyRoles");

// router.get('/', rentalController.rentVehicle);
router.get("/", rentalController.getAllRentals); // this is to fetch all rentals in the rental collection

// To create a new rental
router.post("/create", verifyRoles, rentalController.createRental);

module.exports = router;
