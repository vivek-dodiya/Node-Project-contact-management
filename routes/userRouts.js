const express = require("express");
const {
    currentUser,
  userRegister,
  userLogin,
} = require("../controllers/userController");
const validateToken = require("../middleware/velidateTokenHandler");
const router = express.Router();

router.route("/current").get(validateToken,currentUser);
router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

module.exports = router;
