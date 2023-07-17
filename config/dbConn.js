const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URI);
    if (connect) {
      console.log("Mongodb connected");
    } else {
      console.log(" Could not connect");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
// const connectDB = async () =>
// {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         }
//         );
//     } catch (err) {
//         console.error(err);
//     }
// }

// module.exports = connectDB
