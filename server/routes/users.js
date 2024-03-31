const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth.js");

//Create user
router.post("/register", require("../controllers/users/auth/registerUser.js"));

//Login user
router.post("/login", require("../controllers/users/auth/loginUser.js"));

router.post("/logout", require("../controllers/users/auth/logoutUser.js"));

//Get current user
router.get(
  "/current",
  checkAuth,
  require("../controllers/users/auth/currentUser.js")
);

//Set current name
router.post(
  "/set/name",
  checkAuth,
  require("../controllers/users/change/changeName.js")
);

//Set current surname
router.post(
  "/set/surname",
  checkAuth,
  require("../controllers/users/change/changeSurname.js")
);

//Set current email
router.post(
  "/set/email",
  checkAuth,
  require("../controllers/users/change/changeEmail.js")
);

//Set current password
router.post(
  "/set/password",
  checkAuth,
  require("../middleware/checkPassword.js"),
  require("../controllers/users/change/changePassword.js")
);

module.exports = router;
