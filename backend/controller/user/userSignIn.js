const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false, error: true });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ message: "Incorrect password", success: false, error: true });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .status(200)
      .json({
        message: "Login successful",
        data: token,
        success: true,
        error: false,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error", success: false, error: true });
  }
}

module.exports = userSignInController;
