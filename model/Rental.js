const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    //Anything else?

    // You should add also>
    rentalFee: {
      type: Number,
      required: true,
    },

    // later on you could add:
    // payment which would referrence payment collection
  },
  { timestamps: true } // This line allows mongo to automatically add the creation and update time
);

module.exports = mongoose.model("Rental", rentalSchema);
