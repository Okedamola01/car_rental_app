const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password required to login!" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) return res.sendStatus(401);

  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles);
    const roles = foundUser.roles;
    //create JWTs
    const userInfo = {
      username: foundUser.username,
      email: foundUser.email,
      roles: roles,
    };
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    const accessToken = jwt.sign(userInfo, accessTokenSecret, {
      expiresIn: "240s",
    });

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      refreshTokenSecret,
      {
        expiresIn: "1d",
      }
    );
    //saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();
    const savedToken = {
      accessToken,
      refreshToken,
    };

    res.cookie("tokens", savedToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    }); //secure: true
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
