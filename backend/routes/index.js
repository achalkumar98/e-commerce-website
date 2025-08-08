const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignup");

const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");

const userLogOut = require("../controller/userLogOut")

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);

router.get("/user-details", authToken, userDetailsController);

router.get("/userlogout", userLogOut);


module.exports = router;
