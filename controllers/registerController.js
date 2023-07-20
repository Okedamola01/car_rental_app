const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { firstname, lastname, password, email, username, roles } = req.body;

  if (!firstname || !lastname || !password || !email || !username) {
    return res.status(400).json({
      message: "All fields must be filled",
    });
  }

  try {
    //check for duplicate user in DB
    const duplicate = await User.findOne({ email }); //Here you are searching for a user with the email that you have given
    // you can also use username.
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }

    //password encryption
    // const hashedPwd = await bcrypt.hash(pwd, 10); // Here you do not need to hash password again because
    // you have already hashed it in the schema.

    // create a new user object to add to the database.

    const newUser = {
      // It could have been firstname : req.body.firstname, which means the firstname
      // that you are going to type, but since you hae already destructure it above,
      // you would not need to do that. Rather, you should do it like this.

      firstname,
      lastname,
      email,
      username,
      password,
      roles,
    };

    const user = await User.create(newUser);

    console.log(user);
    res.status(201).json({
      success: true, // This is just to show that the operation went through
      result: user,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occured while creating the user" });
  }
};

module.exports = { handleNewUser };
