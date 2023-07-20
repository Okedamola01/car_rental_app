const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { firstname, lastname, user, pwd, email } = req.body;
  if (!firstname || !lastname || !user || !pwd || !email) {
    return res.status(400).json({
      message:
        "Username, password and email address required to create account!",
    });
    // You error response message is misleading. You are expecting people to enter firstname, lastname, user,pwd and email,
    // but in the error validation message, you are asking for  "'Username, password and email address required to create account!"

    // When I looked at you payload for the register, I saw only username,roles and password. You need to tidy up these things.
  }

  try {
    //check for duplicate user in DB
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) {
      return res.status(409).json({ message: "Username already exists" });
    }

    //password encryption
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store new user
    const result = await User.create({
      firstname: firstname,
      lastname: lastname,
      username: user,
      password: hashedPwd,
      email: email,
    });

    console.log(result);
    res.status(201).json({ success: `New user ${user} successfully created!` });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occured while creating the user" });
  }
};

module.exports = { handleNewUser };
