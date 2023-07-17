require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 7000;

//Connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS!
//also fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//testing
app.get("/", (req, res) => {
  res.send("<h1>Server is working!</h1>");
});

//routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/rental", require("./routes/rental"));

app.use(verifyJWT);
app.use("/vehicles", require("./routes/api/vehicles"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Server connected to MongoDB!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
