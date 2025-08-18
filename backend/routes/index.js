const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/userSignup");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogOut = require("../controller/userLogOut");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userlogout", userLogOut);

// Admin Panel route
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);


module.exports = router;
