const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await UserModel.findOne({email});

    if(user){
      throw new Error("User already exist");
    }

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role : "GENERAL",
      password: hashPassword,
    };

    const userData = new UserModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Sucessfully!",
    });
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
